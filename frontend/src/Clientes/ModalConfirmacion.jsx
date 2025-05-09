import React from 'react';
import './ModalConfirmacion.css';

const ModalConfirmacion = ({ mensaje, onConfirmar, onCancelar }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>{mensaje}</h3>
        <div className="modal-buttons">
          <button className="modal-button cancelar" onClick={onCancelar}>Atrás</button>
          <button className="modal-button confirmar" onClick={onConfirmar}>Cancelar Reserva</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
