import { Route, Routes } from "react-router-dom";
import Cabecera from "./Cabecera/Cabecera";
import Registro from "./Paginas/Registro/Registro";
import InicioSesion from "./Paginas/Inicio/InicioSesion";
import Problemas from "./Paginas/Problemas/Problemas";
import Problema from "./Paginas/Problemas/Problema";
import Admin from "./Paginas/Admin/Admin";
import "./App.css";
import { Suspense } from "react";
import PiePagina from "./PiePagina/PiePagina";
import Usuario from "./Paginas/Usuario/Usuario";
import NuevaContraseña from "./Paginas/Registro/NuevaContraseña";

function App() {
  return (
    <main>
      <Cabecera />
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/registro" element={<Registro />} />
          <Route path="/sesion" element={<InicioSesion />} />
          <Route path="/nuevaContraseña" element={<NuevaContraseña />} />
          <Route path="/*" element={<Problemas />} />
          <Route path="/problemas/:id" element={<Problema />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/usuario/*" element={<Usuario />} />
          <Route path="/filtro/*" element={<Problemas />} />
        </Routes>
      </Suspense>
      <PiePagina />
    </main>
  );
}

export default App;
