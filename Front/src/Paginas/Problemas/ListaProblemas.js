import Rekalde from "./Filtros/Rekalde";
import SinFiltrar from "./Filtros/SinFiltrar";
import Zorroza from "./Filtros/Zorroza";
import { NavLink, Route, Routes } from "react-router-dom";
import "./Problemas.css";
import Deusto from "./Filtros/Deusto";
import Uribarri from "./Filtros/Uribarri";
import Churdinaga from "./Filtros/Churdinaga";
import Begoña from "./Filtros/Begoña";
import Ibaiondo from "./Filtros/Ibaiondo";
import Abando from "./Filtros/Abando";

function ListaProblemas() {
  return (
    <section className="zona_filtro">
      <nav>
        <NavLink to="/filtro">Todos</NavLink>
        <NavLink to="/filtro/zorroza">Zorroza</NavLink>
        <NavLink to="/filtro/rekalde">Rekalde</NavLink>
        <NavLink to="/filtro/deusto">Deusto</NavLink>
        <NavLink to="/filtro/uribarri">Uribarri</NavLink>
        <NavLink to="/filtro/churdinaga">Churdinaga</NavLink>
        <NavLink to="/filtro/begoña">Begoña</NavLink>
        <NavLink to="/filtro/ibaiondo">Ibaiondo</NavLink>
        <NavLink to="/filtro/abando">Abando</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<SinFiltrar />} />
        <Route path="/zorroza" element={<Zorroza />} />
        <Route path="/rekalde" element={<Rekalde />} />
        <Route path="/deusto" element={<Deusto />} />
        <Route path="/uribarri" element={<Uribarri />} />
        <Route path="/churdinaga" element={<Churdinaga />} />
        <Route path="/begoña" element={<Begoña />} />
        <Route path="/ibaiondo" element={<Ibaiondo />} />
        <Route path="/abando" element={<Abando />} />
      </Routes>
    </section>
  );
}

export default ListaProblemas;
