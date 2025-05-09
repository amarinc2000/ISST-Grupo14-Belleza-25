import React from 'react';

const ContactoEmpresas = () => {
    return (
        <div
            className="contacto-empresas-container"
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
            <h1 style={{ color: '#007bff', fontSize: '2.8rem', marginBottom: '25px' }}>
                Incidencias empresas
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#444', marginBottom: '35px' }}>
                Si tu empresa tiene algún problema técnico o duda, no dudes en contactarnos a través de los siguientes canales:
            </p>

            {/* Usando Flexbox para los contenedores */}
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',  // Para que se ajusten en varias filas si es necesario
                    justifyContent: 'space-between', // Espacio entre los elementos
                    gap: '20px', // Espacio entre cada bloque de información
                }}
            >
                <div style={{ flex: '1 1 45%' }}>
                    <h3 style={{ color: '#333', fontSize: '1.4rem', marginBottom: '8px' }}>📧 Correos de Soporte</h3>
                    <p style={{ fontSize: '1.1rem', color: '#555' }}>
                        Para errores al añadir servicios: <strong>servicios-error@belleza.es</strong>
                    </p>
                    <p style={{ fontSize: '1.1rem', color: '#555' }}>
                        Para errores al dar de alta trabajadores: <strong>trabajadores-error@belleza.es</strong>
                    </p>
                    <p style={{ fontSize: '1.1rem', color: '#555' }}>
                        Otros asuntos: <strong>soporte-empresas@belleza.es</strong>
                    </p>
                </div>

                <div style={{ flex: '1 1 45%' }}>
                    <h3 style={{ color: '#333', fontSize: '1.4rem', marginBottom: '8px' }}>📞 Teléfono</h3>
                    <p style={{ fontSize: '1.1rem', color: '#555' }}>
                        <strong>+34 900 123 456</strong>
                    </p>

                    {/* Horario de atención debajo del teléfono */}
                    <h3 style={{ color: '#333', fontSize: '1.4rem', marginBottom: '8px' }}>🕘 Horario de Atención</h3>
                    <p style={{ fontSize: '1.1rem', color: '#555' }}>Lunes a Viernes: 9:00 - 19:00</p>
                    <p style={{ fontSize: '1.1rem', color: '#555' }}>Sábados y festivos: Cerrado</p>
                </div>

                <div style={{ flex: '1 1 100%' }}>
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
        </div>
    );
};

export default ContactoEmpresas;