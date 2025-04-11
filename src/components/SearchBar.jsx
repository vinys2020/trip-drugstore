import React from "react";

const SearchBar = ({ busqueda, setBusqueda }) => {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Buscar producto..."
      value={busqueda}  // Vincula el valor del input con el estado
      onChange={setBusqueda}  // Pasa la función setBusqueda
    />
  );
};

export default SearchBar;
