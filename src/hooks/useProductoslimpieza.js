// hooks/useProductosLimpieza.js
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

const useProductosLimpieza = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      const productosRef = collection(db, "Categoriasid", "Articuloslimpiezaid", "Productosid");
      const q = query(productosRef, where("activo", "==", true)); // 👈 FILTRA solo activos

      try {
        const snapshot = await getDocs(q);
        const productosData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(productosData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  return { productos, loading };
};

export default useProductosLimpieza;
