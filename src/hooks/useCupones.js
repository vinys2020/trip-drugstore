import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const obtenerCuponesUsuario = async (uid) => {
  try {
    // ✅ Ruta correcta a la subcolección
    const cuponesRef = collection(db, `Usuariosid/${uid}/Cuponesid`);

    const snapshot = await getDocs(cuponesRef);

    if (snapshot.empty) {
      console.log(`El usuario ${uid} no tiene cupones.`);
      return []; // Sin cupones
    }

    // ✅ Mapeo y filtrado
    const cupones = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    // ✅ Filtrado: no usados y activos (o sin definir)
    const cuponesDisponibles = cupones.filter(
      (c) =>
        (c.usado === false || c.usado === undefined) &&
        (c.activo === true || c.activo === undefined)
    );

    console.log("Cupones disponibles:", cuponesDisponibles);
    return cuponesDisponibles;
  } catch (error) {
    console.error("Error al obtener cupones:", error);
    return [];
  }
};
