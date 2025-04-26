// hooks/useProductosLimpieza.js
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase"; // Asegúrate de importar db correctamente

const useProductosLimpieza = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      const productosCollection = collection(db, "Categoriasid", "Articuloslimpiezaid", "Productosid");
      try {
        const snapshot = await getDocs(productosCollection);
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
