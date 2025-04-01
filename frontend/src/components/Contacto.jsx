import React from 'react';

const Contacto = () => {
  return (
    <div
      className="contacto-container"
      style={{
        textAlign: 'center',
        marginTop: '50px',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: '50px auto',
      }}
    >
      <h1 style={{ color: '#DF98E8', fontSize: '2.5rem', marginBottom: '20px' }}>Contacto</h1>
      <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '30px' }}>
        Si tienes alguna pregunta, necesitas ayuda o quieres notificar un bug o incidencia, no dudes en contactarnos.
      </p>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '10px' }}>Correo Electrónico</h3>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          <strong>sistema-belleza-isst@belleza.es</strong>
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '10px' }}>Teléfono</h3>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          <strong>+34 999 999 999</strong>
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '10px' }}>Horario de Atención</h3>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>Lunes a Viernes: 9:00 - 18:00</p>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>Sábados: 10:00 - 14:00</p>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>Domingos y festivos: Cerrado</p>
      </div>

      <div>
        <h3 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '10px' }}>Dirección</h3>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>Calle Belleza, 14</p>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>28001, Madrid, España</p>
      </div>
    </div>
  );
};

export default Contacto;