import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../utils/context/UserContext";
import { obtenerVerificacionLogin } from "../utils/functions/peticionesHTTPS";
import "./inicio_sesion.css";
import { registrarCliente } from "../utils/functions/peticionesHTTPS";
import { crearNegocioYTrabajador } from "../utils/functions/peticionesHTTPS";

// Simula una función de registro (reemplaza por tu API real)
const registrarUsuario = async ({ nombre, username, email, password, tipo }) => {
  // Aquí deberías hacer la petición a tu backend para crear la cuenta
  return Promise.resolve();
};

const diasSemana = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo"
];

const InicioSesion = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Estados para login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [empresaUsername, setEmpresaUsername] = useState("");
  const [empresaPassword, setEmpresaPassword] = useState("");
  const [empresaError, setEmpresaError] = useState("");

  // Estado para mostrar el formulario de registro y su tipo
  // null | "cliente" | "empresa"
  const [registroTipo, setRegistroTipo] = useState(null);

  // Estados para registro
  const [regNombre, setRegNombre] = useState("");
  const [regNombreTrabajador, setRegNombreTrabajador] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPasswordRepeat, setRegPasswordRepeat] = useState("");
  const [regError, setRegError] = useState("");
  const [regExito, setRegExito] = useState("");
  const [regDescripcion, setRegDescripcion] = useState("");
  const [regDireccion, setRegDireccion] = useState("");
  const [regTelefono, setRegTelefono] = useState("");
  const [reg_hora_inicio, setRegHoraInicio] = useState("");
  const [reg_hora_fin, setRegHoraFin] = useState("");
  // Estado para días abiertos como array de booleanos
  const [diasAbiertos, setDiasAbiertos] = useState([false, false, false, false, false, false, false]);

  // Para mostrar avisos de campos vacíos tras intentar enviar
  const [intentoEnvio, setIntentoEnvio] = useState(false);

  // Login cliente
  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  try {
    const userData = await obtenerVerificacionLogin({ username, password });
    if (userData.rol !== "CLIENTE") {
      setError("Solo los usuarios registrados como CLIENTE pueden iniciar sesión aquí.");
      return;
    }
    setUser(userData);
    navigate("/");
  } catch {
    setError("Usuario o contraseña incorrectos");
  }
};


  // Login empresa
  const handleEmpresaLogin = async (e) => {
  e.preventDefault();
  setEmpresaError("");
  try {
    const userData = await obtenerVerificacionLogin({
      username: empresaUsername,
      password: empresaPassword,
    });
    if (userData.rol !== "TRABAJADOR") {
      setEmpresaError("Solo los usuarios registrados como TRABAJADOR pueden iniciar sesión aquí.");
      return;
    }
    setUser(userData);
    navigate("/negocio/");
  } catch {
    setEmpresaError("Usuario o contraseña incorrectos");
  }
};


  // Validaciones de campos obligatorios para habilitar el botón CREAR
  const camposCliente = [
    regNombre, regUsername, regEmail, regPassword, regPasswordRepeat
  ];
  const camposEmpresa = [
    regNombre, regUsername, regEmail, regPassword, regPasswordRepeat,
    regDescripcion, regDireccion, regTelefono, reg_hora_inicio, reg_hora_fin
  ];
  const camposLlenos =
    registroTipo === "cliente"
      ? camposCliente.every((v) => v.trim() !== "")
      : camposEmpresa.every((v) => v.trim() !== "");

  // Validación de contraseñas
  const passwordCoincide = regPassword === regPasswordRepeat;

  // Validación de horas
  const generarHoras = (horaInicio, horaFin, intervaloMinutos = 30) => {
    const horas = [];
    let [h, m] = horaInicio.split(':').map(Number);
    const [hFin, mFin] = horaFin.split(':').map(Number);

    while (h < hFin || (h === hFin && m <= mFin)) {
      const hora = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      horas.push(hora);
      m += intervaloMinutos;
      if (m >= 60) {
        m = m % 60;
        h += 1;
      }
    }
    return horas;
  };

  const horas = generarHoras("07:00", "23:00");

  // Manejar selección de días abiertos con botones
  const toggleDia = (index) => {
    setDiasAbiertos(prev =>
      prev.map((abierto, i) => (i === index ? !abierto : abierto))
    );
  };

  // Registro (cliente o empresa)
  const handleRegistro = async (e) => {
    e.preventDefault();
    setIntentoEnvio(true);
    setRegError("");
    setRegExito("");
    if (!camposLlenos) {
      setRegError("Por favor, rellena todos los campos obligatorios.");
      return;
    }
    if (!passwordCoincide) {
      setRegError("Las contraseñas no coinciden.");
      return;
    }
    try {
      // Construir bodyUser
      const bodyUser = {
        username: regUsername,
        password: regPassword,
      };

      // Construir bodyCliente
      const bodyCliente = {
        nombre: regNombre,
        email: regEmail,
      };

      // Construir bodyNegocio con el formato que diste
      const bodyNegocio = {
        nombre: regNombre,
        descripcion: regDescripcion,
        direccion: regDireccion,
        telefono: regTelefono,
        email: regEmail,
        lunesAbierto: diasAbiertos[0],
        martesAbierto: diasAbiertos[1],
        miercolesAbierto: diasAbiertos[2],
        juevesAbierto: diasAbiertos[3],
        viernesAbierto: diasAbiertos[4],
        sabadoAbierto: diasAbiertos[5],
        domingoAbierto: diasAbiertos[6],
        hora_inicio: reg_hora_inicio.length === 5 ? reg_hora_inicio + ":00" : reg_hora_inicio,
        hora_fin: reg_hora_fin.length === 5 ? reg_hora_fin + ":00" : reg_hora_fin,
      };
      // Construir bodyTrabajador
      const bodyTrabajador = {
        nombre: regNombreTrabajador
      };
      // peticion para crear el cliente, cuando l formato de registro sea cliente
      if (registroTipo === "cliente") {
        await registrarCliente(bodyCliente, bodyUser);
      }
      if (registroTipo === "empresa") {
        await crearNegocioYTrabajador(bodyNegocio, bodyTrabajador, bodyUser);
      }
      setRegExito("¡Cuenta creada con éxito! Ya puedes iniciar sesión");
      setTimeout(() => {
        setRegistroTipo(null);
        setRegNombre("");
        setRegUsername("");
        setRegEmail("");
        setRegPassword("");
        setRegPasswordRepeat("");
        setRegDescripcion("");
        setRegDireccion("");
        setRegTelefono("");
        setDiasAbiertos([false, false, false, false, false, false, false]);
        navigate("/");
      }, 2000);
    } catch {
      setRegError("Error al crear la cuenta. Intenta de nuevo.");
    }
  };

  // Formulario de registro único, en vertical
  const formularioRegistro = (
    <form onSubmit={handleRegistro} className="formulario-registro-vertical">
      <h2 className="titulo-seccion">
        CREAR CUENTA {registroTipo === "cliente" ? "CLIENTE" : "EMPRESA"}
      </h2>

      <div className="columnnas">
        <div className="columnna-izquierda">
          <input
            type="text"
            placeholder={registroTipo === "cliente" ? "Nombre" : "Nombre del negocio"}
            value={regNombre}
            onChange={(e) => setRegNombre(e.target.value)}
            required
            className={intentoEnvio && !regNombre ? "input input-error" : "input"}
          />

          <input
            type="email"
            placeholder={registroTipo === "cliente" ? "Correo electrónico" : "Correo electrónico del negocio"}
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
            required
            className={intentoEnvio && !regEmail ? "input input-error" : "input"}
          />

          {registroTipo === "empresa" && (
            <>
              <input
                type="text"
                placeholder="Descripción del negocio"
                value={regDescripcion}
                onChange={(e) => setRegDescripcion(e.target.value)}
                required
                className={intentoEnvio && !regDescripcion ? "input input-error" : "input"}
              />

              <input
                type="text"
                placeholder="Dirección del negocio"
                value={regDireccion}
                onChange={(e) => setRegDireccion(e.target.value)}
                required
                className={intentoEnvio && !regDireccion ? "input input-error" : "input"}
              />

              <input
                type="text"
                placeholder="Teléfono del negocio"
                value={regTelefono}
                onChange={(e) => setRegTelefono(e.target.value)}
                required
                className={intentoEnvio && !regTelefono ? "input input-error" : "input"}
              />
              <select
                value={reg_hora_inicio}
                onChange={(e) => setRegHoraInicio(e.target.value)}
                required
                className={intentoEnvio && !reg_hora_inicio ? "input input-error" : "input"}
              >
                <option value="">Hora de apertura</option>
                {horas.map((hora) => (
                  <option key={hora} value={hora}>{hora}</option>
                ))}
              </select>

              <select
                value={reg_hora_fin}
                onChange={(e) => setRegHoraFin(e.target.value)}
                required
                className={intentoEnvio && !reg_hora_fin ? "input input-error" : "input"}
              >
                <option value="">Hora de cierre</option>
                {horas.map((hora) => (
                  <option key={hora} value={hora}>{hora}</option>
                ))}
              </select>
            </>
          )}

          <div className="columnna-derecha"></div>

          {registroTipo === "empresa" && (
            <>
              <div className="dias-abiertos-container">
                <span className="label-hora">Días abiertos:</span>
                <div className="dias-botones">
                  {diasSemana.map((dia, i) => (
                    <button
                      key={dia}
                      type="button"
                      className={diasAbiertos[i] ? "dia-boton abierto" : "dia-boton"}
                      onClick={() => toggleDia(i)}
                    >
                      {dia}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="text"
                placeholder="Nombre Administrador"
                value={regNombreTrabajador}
                onChange={(e) => setRegNombreTrabajador(e.target.value)}
                required
                className={intentoEnvio && !regNombreTrabajador ? "input input-error" : "input"}
              />
            </>
          )}

          <input
            type="text"
            placeholder={registroTipo === "cliente" ? "Usuario" : "Usuario Administrador"}
            value={regUsername}
            onChange={(e) => setRegUsername(e.target.value)}
            required
            className={intentoEnvio && !regUsername ? "input input-error" : "input"}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            required
            className={intentoEnvio && !regPassword ? "input input-error" : "input"}
          />
          <input
            type="password"
            placeholder="Repetir contraseña"
            value={regPasswordRepeat}
            onChange={(e) => setRegPasswordRepeat(e.target.value)}
            required
            className={intentoEnvio && !regPasswordRepeat ? "input input-error" : "input"}
          />
          {!passwordCoincide && regPasswordRepeat && (
            <div className="error-login">Las contraseñas no coinciden.</div>
          )}
          {intentoEnvio && !camposLlenos && (
            <div className="error-login">Por favor, rellena todos los campos obligatorios.</div>
          )}
        </div>
      </div>
      <div className="botones-registro">
        <button type="submit" disabled={!camposLlenos || !passwordCoincide}>
          CREAR
        </button>
        <button type="button" onClick={() => setRegistroTipo(null)}>
          Cancelar
        </button>
      </div>
      {regError && <div className="error-login">{regError}</div>}
      {regExito && <div className="exito-login">{regExito}</div>}
    </form>
  );

  return (
    <div className="inicio-sesion-container">
      {registroTipo ? (
        formularioRegistro
      ) : (
        <div className="contenedor-secciones">
          {/* CLIENTES */}
          <div className="seccion">
            <h2 className="titulo-seccion">CLIENTES</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Usuario"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="boton-acceder" type="submit">
                ACCEDER
              </button>
            </form>
            <button
              className="boton-crear-cuenta"
              onClick={() => setRegistroTipo("cliente")}
            >
              CREAR NUEVA CUENTA
            </button>
            {error && <div className="error-login">{error}</div>}
          </div>
          {/* EMPRESAS */}
          <div className="seccion">
            <h2 className="titulo-seccion">NEGOCIOS</h2>
            <form onSubmit={handleEmpresaLogin}>
              <input
                type="text"
                placeholder="Usuario Trabajador"
                className="input"
                value={empresaUsername}
                onChange={(e) => setEmpresaUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="input"
                value={empresaPassword}
                onChange={(e) => setEmpresaPassword(e.target.value)}
              />
              <button className="boton-acceder" type="submit">
                ACCEDER
              </button>
            </form>
            <button
              className="boton-crear-cuenta"
              onClick={() => setRegistroTipo("empresa")}
            >
              CREAR NUEVO NEGOCIO
            </button>
            {empresaError && <div className="error-login">{empresaError}</div>}
          </div>
        </div>
      )}

      <Link to="/">
        <button className="boton-volver">VOLVER A INICIO</button>
      </Link>
    </div>
  );
};

export default InicioSesion;


