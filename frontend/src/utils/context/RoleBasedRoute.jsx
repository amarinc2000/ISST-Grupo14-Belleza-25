import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const RoleBasedRoute = ({ children, roles }) => {
  const { user } = useContext(UserContext);

  // Si no hay usuario autenticado
  if (!user) {
    return <Navigate to="/inicio-sesion" replace />;
  }

  // Si el rol del usuario no está en los permitidos
  if (!roles.includes(user.rol)) { // Cambia "rol" por el nombre correcto de la propiedad en tu objeto user
    return <Navigate to="/inicio-sesion" />; // O a una ruta /acceso-denegado
  }

  // Si todo es correcto, renderiza el componente hijo
  return children;
};

export default RoleBasedRoute;

