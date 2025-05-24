import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";

export default function CategoriasDropdown() {
  const [categorias, setCategorias] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992); // Bootstrap breakpoint for lg
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile]);

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

  const toggleDropdown = () => {
    if (isMobile) {
      setIsOpen((prev) => !prev);
      document.getElementById("navbarNav")?.classList.remove("show");
    }
  };

  return (
    <li
      className={`nav-item dropdown ${isMobile && isOpen ? "show" : ""}`}
      ref={dropdownRef}
      onClick={toggleDropdown}
      onMouseEnter={!isMobile ? () => setIsOpen(true) : null}
      onMouseLeave={!isMobile ? () => setIsOpen(false) : null}
    >
      <Link
        className="nav-link dropdown-toggle"
        to="#"
        id="navbarDropdown"
        role="button"
        aria-expanded={isOpen}
      >
        Categorías
      </Link>
      <ul
        className={`dropdown-menu ${isMobile && isOpen ? "show" : ""}`}
        aria-labelledby="navbarDropdown"
      >
        {categorias.map((cat) => (
          <li key={cat.id}>
            <Link
              className="dropdown-item"
              to={`/categorias/${cat.id}`}
              onClick={() => setIsOpen(false)}
            >
              {cat.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
