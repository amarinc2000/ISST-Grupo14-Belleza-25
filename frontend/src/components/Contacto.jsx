import React from 'react';

const Contacto = () => {
  return (
    <div
      className="contacto-container"
      style={{
        textAlign: 'center',
        margin: '50px auto',
        padding: '40px 30px',
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(to right, #fdfbfb, #ebedee)',
        borderRadius: '12px',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
        maxWidth: '700px',
      }}
    >
      <h1 style={{ color: '#C94ED7', fontSize: '2.8rem', marginBottom: '25px' }}>
        Incidencias clientes
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#444', marginBottom: '35px' }}>
        ¿Tienes dudas, necesitas ayuda o quieres reportar un problema? ¡Estamos para ayudarte!
      </p>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#333', fontSize: '1.4rem', marginBottom: '8px' }}>📧 Correo Electrónico</h3>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          <strong>sistema-belleza-isst@belleza.es</strong>
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#333', fontSize: '1.4rem', marginBottom: '8px' }}>📞 Teléfono</h3>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          <strong>+34 999 999 999</strong>
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#333', fontSize: '1.4rem', marginBottom: '8px' }}>🕘 Horario de Atención</h3>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>Lunes a Viernes: 9:00 - 18:00</p>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>Sábados: 10:00 - 14:00</p>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>Domingos y festivos: Cerrado</p>
      </div>

      <div>
        <h3 style={{ color: '#333', fontSize: '1.4rem', marginBottom: '8px' }}>📍 Dirección</h3>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>Calle Belleza, 14</p>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>28001, Madrid, España</p>
        <iframe
          title="Ubicación en Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.792013135293!2d-3.6647669251679957!3d40.43560415449228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422f354adb185f%3A0xd11fbeaee25181f3!2sC.%20Belleza%2C%2014%2C%20Salamanca%2C%2028028%20Madrid!5e0!3m2!1ses!2ses!4v1746558986393!5m2!1ses!2ses"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: '10px', marginTop: '20px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default Contacto;
