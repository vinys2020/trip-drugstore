import React, { createContext, useState } from "react";

// Creamos el contexto
export const CartContext = createContext();

// Proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0); // Estado para manejar el descuento
  const [coupon, setCoupon] = useState(""); // Estado para manejar el código de cupón

  // Agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCart((prevCart) => {
      const productoExistente = prevCart.find((p) => p.id === producto.id);
      if (productoExistente) {
        // Si ya está, aumentamos la cantidad
        return prevCart.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        // Si no está, lo agregamos con cantidad 1
        return [...prevCart, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Eliminar un producto del carrito
  const eliminarDelCarrito = (productoId) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== productoId));
  };

  // Disminuir cantidad de un producto
  const disminuirCantidad = (productoId) => {
    setCart((prevCart) =>
      prevCart
        .map((p) =>
          p.id === productoId ? { ...p, cantidad: p.cantidad - 1 } : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  // Vaciar todo el carrito
  const vaciarCarrito = () => {
    setCart([]);
  };

  // Aplicar cupón
  const aplicarCupon = (codigo) => {
    if (codigo === "DESCUENTO10") {
      setDiscount(10); // Aplica un 10% de descuento
    } else {
      alert("Cupón inválido");
    }
  };

  // Calcular el total a pagar con el descuento
  const calcularTotal = () => {
    let total = cart.reduce((acc, p) => acc + p.cantidad * parseFloat(p.precio), 0);
    return total - (total * discount) / 100; // Descuento aplicado al total
  };

  // Total de productos
  const totalItems = cart.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        agregarAlCarrito,
        eliminarDelCarrito,
        disminuirCantidad,
        vaciarCarrito,
        totalItems,
        totalPrecio: calcularTotal(),
        aplicarCupon,
        coupon,
        setCoupon,
        discount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
