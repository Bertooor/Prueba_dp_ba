import { useState } from "react";
import { Link } from "react-router-dom";
import "./Registro.css";

function Registro() {
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        avatar,
        email,
        password,
      }),
    });
    const data = await res.json();
    if (data.status === "error") {
      setStatus("error");
      setMessage(data.message);
    } else {
      setStatus("ok");
      setMessage(data.message);
    }
  };

  return (
    <section className="seccion_registro">
      <h2>Registro</h2>
      <form className="form_registro" onSubmit={handleSubmit}>
        <label>
          <span>Avatar</span>
          <input
            name="avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </label>
        <label>
          <span>Correo electrónico</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Contraseña</span>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Registro</button>
        {status === "error" && <p className="api">{message}</p>}
        {status === "ok" && <p className="api">{message}</p>}

        <p>
          Después de registrarte y validar tu usuario en tu correo
          electrónico...
          <p>
            <Link to="/sesion" className="iniciaSesion">
              Inicia sesión
            </Link>
          </p>
        </p>
      </form>
    </section>
  );
}

export default Registro;
