import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

const useProductosots = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      const productosRef = collection(db, "Categoriasid", "Otrosid", "Productosid");
      const q = query(productosRef, where("activo", "==", true));

      try {
        const snapshot = await getDocs(q);
        const productosData = snapshot.docs.map(doc => ({
          id: doc.id,
          categoriaId: "Otrosid",
          ...doc.data(),
        }));
        setProductos(productosData);
      } catch (error) {
        console.error("Error fetching Trip Café products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  return { productos, loading };
};

export default useProductosots;
