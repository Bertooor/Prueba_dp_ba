import { NavLink, Route, Routes } from "react-router-dom";
import Avatar from "./Avatar";
import { useUser } from "../../UserContext";
import EditarUsuario from "./EditarUsuario";
import BorrarAvatar from "./BorrarAvatar";
import "./Usuario.css";
import BorrarUsuario from "./BorrarUsuario";

function Usuario() {
  const user = useUser();
  if (user) {
    return (
      <section className="zona_usuario">
        <h2>Perfil usuario</h2>
        <nav>
          <NavLink to="/usuario">Imagen avatar</NavLink>
          <NavLink to="/usuario/editarDatosUsuario">
            Editar datos usuario
          </NavLink>
          <NavLink to="/usuario/borrarImagen">Borrar avatar</NavLink>
          <NavLink to="/usuario/borrarUsuario">Borrar usuario</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Avatar />} />
          <Route path="/editarDatosUsuario" element={<EditarUsuario />} />

          <Route path="/borrarImagen" element={<BorrarAvatar />} />
          <Route path="/borrarUsuario" element={<BorrarUsuario />} />
        </Routes>
      </section>
    );
  } else {
    return <p className="sin_acceso">No tienes acceso a esta sección.</p>;
  }
}

export default Usuario;
