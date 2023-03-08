import { NavLink, Route, Routes } from "react-router-dom";
import { useUser } from "../../UserContext";
import "./Admin.css";
import NuevoProblema from "./NuevoProblema";
import ListaEditar from "./ListaEditar";
import EditarDatosProblema from "./EditarDatosProblema";
import ListaBorrarImagen from "./ListaBorrarImagen";
import BorrarImagen from "./BorrarImagen";
import ListaAñadirImagen from "./ListaAñadirImagen";
import AñadirImagen from "./AñadirImagen";
import ListaBorrarProblema from "./ListaBorrarProblema";

function Admin() {
  const user = useUser();
  if (user?.data.role === "admin") {
    return (
      <section className="zona_admin">
        <h2>Zona de administración</h2>
        <nav>
          <NavLink to="/admin">Problema nuevo</NavLink>
          <NavLink to="/admin/editarDatosProblema">
            Editar datos problema
          </NavLink>
          <NavLink to="/admin/borrarImagen">Borrar imagen</NavLink>
          <NavLink to="/admin/añadirImagen">Añadir imagen</NavLink>
          <NavLink to="/admin/borrarProblema">Borrar problema</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<NuevoProblema />} />
          <Route path="/editarDatosProblema" element={<ListaEditar />} />
          <Route
            path="/editarDatosProblema/:id"
            element={<EditarDatosProblema />}
          />
          <Route path="/borrarImagen" element={<ListaBorrarImagen />} />
          <Route path="/borrarImagen/:id" element={<BorrarImagen />} />
          <Route path="/añadirImagen" element={<ListaAñadirImagen />} />
          <Route path="/añadirImagen/:id" element={<AñadirImagen />} />
          <Route path="/borrarProblema" element={<ListaBorrarProblema />} />
        </Routes>
      </section>
    );
  } else {
    return <p className="sin_acceso">No tienes acceso a esta sección.</p>;
  }
}

export default Admin;
