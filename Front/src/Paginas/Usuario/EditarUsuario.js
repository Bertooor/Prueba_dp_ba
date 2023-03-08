import { useUser } from "../../UserContext";
import useFetch from "fetch-suspense";
import { useState } from "react";

function EditarUsuario() {
  const user = useUser();
  const usuario = useFetch(
    `${process.env.REACT_APP_API}/usuarios/` + user.data.id,
    {
      headers: {
        Authorization: user.data.token,
      },
    }
  );
  const [avatar, setAvatar] = useState(usuario.data.avatar);
  const [email, setEmail] = useState(usuario.data.email);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("avatar", avatar);
    formData.append("email", email);

    const res = await fetch(
      `${process.env.REACT_APP_API}/usuarios/` + user.data.id,
      {
        method: "PUT",
        headers: {
          Authorization: user.data.token,
        },
        body: formData,
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

  return (
    <section className="editar_usuario">
      <h2>Editar datos usuario</h2>
      <form onSubmit={handleSubmit} className="form_nuevo">
        <label>
          <span>Avatar</span>
          <input
            required
            name="avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </label>
        <label>
          <span>Correo</span>
          <input
            required
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button>Sustituir</button>
        {status === "error" && <p className="api">{message}</p>}
        {status === "ok" && <p className="api">{message}</p>}
      </form>
    </section>
  );
}

export default EditarUsuario;
