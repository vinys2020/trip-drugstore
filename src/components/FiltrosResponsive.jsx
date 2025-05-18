import React from "react";
import "./FiltrosResponsive.css";

export default function FiltrosResponsive({ children, mostrar, toggleMostrar }) {
  return (
    <>


      {/* Drawer lateral móvil */}
      <div className={`drawer-overlay ${mostrar ? "active" : ""}`} onClick={toggleMostrar}></div>
      <div className={`drawer-panel ${mostrar ? "active" : ""}`}>
        <div className="drawer-header d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5 className="mb-0">Filtros</h5>
          <button className="btn btn-sm btn-danger" onClick={toggleMostrar}>X</button>
        </div>
        <div className="p-3 overflow-auto" style={{ maxHeight: "calc(100vh - 60px)" }}>
          {children}
        </div>
      </div>

      {/* Filtros siempre visibles en desktop */}
      <div className="d-none d-md-block">
        {children}
      </div>
    </>
  );
}
