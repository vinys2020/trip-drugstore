import React from "react";

const ProductoCard = ({ producto, onAdd }) => {
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text">${producto.precio}</p>
          <button className="btn btn-primary" onClick={() => onAdd(producto)}>
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;
