import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";

export default function CategoriasDropdown() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const q = query(collection(db, "Categoriasid"), orderBy("orden"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre || doc.id,
      }));
      setCategorias(data);
    };

    fetchCategorias();
  }, []);

  return (
    <li className="nav-item dropdown">
      <Link
        className="nav-link dropdown-toggle"
        to="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={() =>
          document.getElementById("navbarNav")?.classList.remove("show")
        }
      >
        Categorías
      </Link>
      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
        {categorias.map((cat) => (
          <li key={cat.id}>
            <Link
              className="dropdown-item"
              to={`/categorias/${cat.id}`}
              onClick={() =>
                document.getElementById("navbarNav")?.classList.remove("show")
              }
            >
              {cat.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
