import { Link } from "react-router-dom";
import AutUsuario from "./AutUsuario";
import "./Cabecera.css";

function Cabecera() {
  return (
    <header className="cabecera_principal">
      <Link to="/">
        <img
          className="logo"
          src="/Bilbao_accesible_logo-removebg-preview.png"
          alt="imagen logo"
        />
      </Link>
      <Link to="/">
        <h1>Bilbao accesible</h1>
      </Link>
      <AutUsuario />
    </header>
  );
}

export default Cabecera;
