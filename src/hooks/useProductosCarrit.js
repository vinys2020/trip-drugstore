import { useState, useEffect } from "react";
import { doc, getDoc, runTransaction } from "firebase/firestore";
import { db } from "../config/firebase";

const useProductosCarrit = (cart) => {
  const [productosActualizados, setProductosActualizados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stockDisponible, setStockDisponible] = useState(true);
  const [error, setError] = useState(null);

  // Traer datos frescos de cada producto en carrito desde Firebase
  const fetchProductosCarrito = async () => {
    setLoading(true);
    setError(null);

    try {
      const productos = [];
      for (const item of cart) {
        if (!item.categoriaId) {
          console.warn(`Falta categoriaId para el producto: ${item.nombre || item.id}`);
          continue;
        }

        const productoRef = doc(db, `Categoriasid/${item.categoriaId}/Productosid/${item.id}`);
        const productoSnap = await getDoc(productoRef);

        if (productoSnap.exists()) {
          productos.push({
            id: productoSnap.id,
            categoriaId: item.categoriaId,
            cantidad: item.cantidad,
            ...productoSnap.data(),
          });
        } else {
          console.warn(`Producto no encontrado: ${item.id}`);
        }
      }
      setProductosActualizados(productos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Verificar si hay stock suficiente para todos los productos en carrito
  const verificarStock = () => {
    for (const producto of productosActualizados) {
      if (producto.stock < producto.cantidad) {
        setStockDisponible(false);
        return false;
      }
    }
    setStockDisponible(true);
    return true;
  };

  // Descontar stock con transacción
  const descontarStock = async () => {
    setError(null);
    try {
      await runTransaction(db, async (transaction) => {
        for (const producto of productosActualizados) {
          if (!producto.categoriaId) continue;

          const productoDocRef = doc(db, `Categoriasid/${producto.categoriaId}/Productosid/${producto.id}`);
          const productoDoc = await transaction.get(productoDocRef);

          if (!productoDoc.exists()) {
            throw new Error(`Producto no existe: ${producto.id}`);
          }

          const stockActual = productoDoc.data().stock || 0;

          if (stockActual < producto.cantidad) {
            throw new Error(`No hay suficiente stock para ${producto.nombre || producto.id}`);
          }

          transaction.update(productoDocRef, { stock: stockActual - producto.cantidad });
        }
      });

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Refrescar productos actualizados cada vez que cambie el carrito
  useEffect(() => {
    if (cart.length > 0) {
      fetchProductosCarrito();
    } else {
      setProductosActualizados([]);
      setStockDisponible(true);
    }
  }, [cart]);

  return {
    productosActualizados,
    loading,
    stockDisponible,
    error,
    verificarStock,
    descontarStock,
    fetchProductosCarrito,
  };
};

export default useProductosCarrit;
