// src/services/firebaseService.js
import { db } from "../config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export async function crearCategoriaYProducto({ categoria, producto }) {
  try {
    // Crear ID personalizado: nombre en minúsculas sin espacios + "id"
    const categoriaId =
      categoria.nombre.toLowerCase().replace(/\s+/g, "") + "id";

    // Crear documento de categoría con ID personalizado
    const categoriaRef = doc(db, "Categoriasid", categoriaId);
    await setDoc(categoriaRef, categoria);

    // Crear documento de producto dentro de la subcolección
    const productoRef = doc(collection(categoriaRef, "Productosid")); // ID aleatorio para el producto
    await setDoc(productoRef, producto);

    console.log("Categoría y producto creados correctamente");
  } catch (error) {
    console.error("Error al crear categoría y producto:", error);
    throw error;
  }
}
