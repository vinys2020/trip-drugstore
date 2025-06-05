import React, { createContext, useState, useEffect } from "react";
import { getFirestore, collection, getDocs, doc, getDoc, runTransaction } from "firebase/firestore";
import { getApp } from "firebase/app";

// Creamos el contexto
export const CartContext = createContext();

export const CartProvider = ({ children, userId }) => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const [telefonoUsuario, setTelefonoUsuario] = useState("");
  const [cuponesUsuario, setCuponesUsuario] = useState([]);
  const [loadingCupones, setLoadingCupones] = useState(true);

  // Obtener instancia de Firestore
  const app = getApp();
  const db = getFirestore(app);

    // **Carga carrito almacenado en localStorage al iniciar**
    useEffect(() => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }, []);
  
    // **Guarda carrito en localStorage cada vez que cambia**
    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

  // Cargar cupones del usuario
  useEffect(() => {
    if (!userId) return;
  
    const cargarCupones = async () => {
      setLoadingCupones(true);
      try {
        const cuponesCol = collection(db, `Usuariosid/${userId}/Cuponesid`);
        const cuponesSnapshot = await getDocs(cuponesCol);
        const cupones = cuponesSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            codigo: doc.id.toUpperCase(),
            descuento: data.descuento || 0,
            usado: data.usado || false,
          };
        });
        setCuponesUsuario(cupones);
      } catch (error) {
        console.error("Error al cargar cupones:", error);
        setCuponesUsuario([]);
      } finally {
        setLoadingCupones(false);
      }
    };
  
    cargarCupones();
  }, [userId, db]);

  // Función auxiliar para obtener categoriaId consistente
  const obtenerCategoriaId = (producto) => {
    if (producto.categoriaId) return producto.categoriaId;
    if (producto.Categoriasid) return producto.Categoriasid;
    if (producto.categoria) return producto.categoria;
    if (producto.Categorias) return producto.Categorias;
  
    console.warn(`Producto con id ${producto.id} no tiene categoriaId definido.`);
    return "sin-categoria"; // o null si prefieres
  };

  const agregarAlCarrito = (producto, categoriaId) => {
    const productoConCategoria = { ...producto, categoriaId };
  
    setCart((prevCart) => {
      const productoExistente = prevCart.find((p) => p.id === producto.id);
      if (productoExistente) {
        return prevCart.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [...prevCart, { ...productoConCategoria, cantidad: 1 }];
      }
    });
  };
  
  
  
  

  // Eliminar producto del carrito
  const eliminarDelCarrito = (productoId) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== productoId));
  };

  // Disminuir cantidad del producto
  const disminuirCantidad = (productoId) => {
    setCart((prevCart) =>
      prevCart
        .map((p) =>
          p.id === productoId ? { ...p, cantidad: p.cantidad - 1 } : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setCart([]);
  };

  // Aplicar cupón
  const aplicarCupon = (cupon) => {
    if (!cupon || cupon.usado) {
      setDiscount(0);
      setCoupon(null);
      return;
    }
    setDiscount(cupon.descuento);
    setCoupon(cupon);
  };

  // Calcular total con descuento aplicado
  const calcularTotal = () => {
    let total = cart.reduce((acc, p) => acc + p.cantidad * parseFloat(p.precio), 0);
    if (discount > 0) {
      total = total - (total * discount) / 100;
    }
    return total;
  };

  const totalItems = cart.reduce((acc, p) => acc + p.cantidad, 0);

  // Verificar stock disponible en Firebase antes de comprar
  const verificarStockDisponible = async () => {
    try {
      const checks = await Promise.all(cart.map(async (item) => {
        if (!item.categoriaId) {
          console.warn(`Falta categoriaId para el producto: ${item.descripcion || item.id}`);
          return false;
        }
        const productoDocRef = doc(db, `Categoriasid/${item.categoriaId}/Productosid/${item.id}`);
        const productoSnap = await getDoc(productoDocRef);
        if (!productoSnap.exists()) {
          console.warn(`Producto no encontrado en Firebase: ${item.id}`);
          return false;
        }
        const data = productoSnap.data();
        return data.stock >= item.cantidad;
      }));
      return checks.every(Boolean);
    } catch (error) {
      console.error("Error al verificar stock:", error);
      return false;
    }
  };
  
  

  // Descontar stock en Firebase con transacción
  const descontarStock = async () => {
    try {
      await runTransaction(db, async (transaction) => {
        for (const item of cart) {
          if (!item.categoriaId) continue;
  
          const productoDocRef = doc(db, `Categoriasid/${item.categoriaId}/Productosid/${item.id}`);
          const productoDoc = await transaction.get(productoDocRef);
  
          if (!productoDoc.exists()) {
            throw new Error(`Producto no existe: ${item.id}`);
          }
  
          const stockActual = productoDoc.data().stock || 0;
  
          if (stockActual < item.cantidad) {
            throw new Error(`No hay suficiente stock para ${item.descripcion || item.id}`);
          }
  
          transaction.update(productoDocRef, { stock: stockActual - item.cantidad });
        }
      });
      console.log("Stock actualizado correctamente");
    } catch (error) {
      console.error("Error al descontar stock en transacción:", error);
      throw error;
    }
  };
  

  return (
    <CartContext.Provider
      value={{
        cart,
        agregarAlCarrito,
        eliminarDelCarrito,
        disminuirCantidad,
        totalItems,
        totalPrecio: calcularTotal(),
        aplicarCupon,
        coupon,
        setCoupon,
        discount,
        telefonoUsuario,
        setTelefonoUsuario,
        vaciarCarrito,
        cuponesUsuario,
        verificarStockDisponible,
        descontarStock,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
