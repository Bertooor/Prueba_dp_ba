import { Link } from "react-router-dom";
import { useUser, useSetUser } from "../UserContext";
import ImagenAvatar from "../Paginas/Usuario/ImagenAvatar";

function AutUsuario() {
  const user = useUser();
  const setUser = useSetUser();

  if (user) {
    return (
      <section className="usuario_avatar">
        {user.data.role === "admin" ? <Link to="/admin">Admin</Link> : null}
        <section className="usuario_avatar">
          <ImagenAvatar />
          <Link to="/usuario">
            <span className="avatar_nombre">{user.data.avatar}</span>
          </Link>
        </section>
        <span onClick={() => setUser(null)} className="salir">
          Salir
        </span>
      </section>
    );
  } else {
    return (
      <section>
        <Link to="/registro" className="registro">
          Regístro
        </Link>
        <Link to="/sesion">Inicio sesión</Link>
      </section>
    );
  }
}

export default AutUsuario;
