import { useState } from "react";
import { Link } from "react-router-dom";

function NuevaContraseña() {
  const [email, setEmail] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [recoverCode, setRecoverCode] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.REACT_APP_API}/usuarios/recuperaContrasena`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
        }),
      }
    );
    const data = await res.json();
    if (data.status === "error") {
      setStatus("error");
      setMessage(data.message);
    } else {
      setStatus("ok");
      setMessage(data.message);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.REACT_APP_API}/usuarios/nuevaContrasena`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recoverCode,
          nuevaContrasena,
        }),
      }
    );
    const data = await res.json();
    if (data.status === "error") {
      setEstado("error");
      setMensaje(data.message);
    } else {
      setEstado("ok");
      setMensaje(data.message);
    }
  };

  return (
    <section className="seccion_inicio">
      <h2>Nueva contraseña</h2>
      <form className="form_inicio" onSubmit={handleSubmit}>
        <p>
          Danos tu correo electrónico y te enviaremos un código para recuperar
          tu contraseña.
        </p>
        <label>
          <span>Correo electrónico</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button>Enviar correo</button>
        {status === "error" && <p className="api">{message}</p>}
        {status === "ok" && <p className="api">{message}</p>}
      </form>
      <hr />
      <form className="form_inicio" onSubmit={handleSubmit2}>
        <label>
          <span>Código de recuperación</span>
          <input
            name="recoverCode"
            value={recoverCode}
            onChange={(e) => setRecoverCode(e.target.value)}
          />
        </label>
        <label>
          <span>Nueva contraseña</span>
          <input
            name="nuevaContrasena"
            type="password"
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
          />
        </label>
        <button>Enviar contraseña</button>
        {estado === "error" && <p className="api">{mensaje}</p>}
        {estado === "ok" && <p className="api">{mensaje}</p>}
        <p>
          Si has completado ambos pasos...
          <p>
            <Link to="/sesion" className="inicioRegistro">
              Inicia sesión
            </Link>
          </p>
        </p>
      </form>
    </section>
  );
}

export default NuevaContraseña;
