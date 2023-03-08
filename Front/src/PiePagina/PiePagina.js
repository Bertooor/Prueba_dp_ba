import "./PiePagina.css";
import { Link } from "react-router-dom";

function PiePagina() {
  return (
    <footer className="pie_pagina">
      <hr />
      <section>
        <Link to="/">
          <img
            className="logo"
            src="/Bilbao_accesible_logo-removebg-preview.png"
            alt="imagen logo"
          />
        </Link>
        <p>(c) 2022 Alberto Leandro</p>
      </section>
      <hr />
    </footer>
  );
}

export default PiePagina;
