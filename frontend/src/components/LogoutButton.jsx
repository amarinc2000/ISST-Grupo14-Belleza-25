import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/context/UserContext";

function LogoutButton() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Elimina usuario del contexto y del localStorage
    navigate("/inicio-sesion"); // Redirige al login
  };

  return (
    <button onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
}
