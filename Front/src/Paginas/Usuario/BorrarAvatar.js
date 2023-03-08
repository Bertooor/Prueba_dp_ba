import { useEffect, useState } from "react";
import { useUser } from "../../UserContext";
import "./Usuario.css";

function BorrarAvatar() {
  const user = useUser();
  const [avatar, setAvatar] = useState();
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API}/usuarios/${user.data.id}/imagen`,
        {
          headers: {
            Authorization: user.data.token,
          },
        }
      );
      const data = await res.json();
      setAvatar(data);
    })();
  }, [user.data.id, user.data.token]);

  const borrandoAvatar = async (e) => {
    const res = await fetch(
      `
      ${process.env.REACT_APP_API}/usuarios/${user.data.id}/avatar/${avatar.data.imagen_id}
    `,
      {
        method: "DELETE",
        headers: {
          Authorization: user.data.token,
        },
      }
    );
    const data = await res.json();
    if (data.status === "error") {
      setStatus("error");
      setMessage(data.message);
    } else {
      setStatus("ok");
      setMessage(data.message);
      setAvatar(null);
    }
  };

  return (
    <section className="borrar_avatar">
      <h2>Borrar avatar</h2>
      {avatar?.data?.imagen ? (
        <div>
          <img
            src={`http://127.0.0.1:3000/${avatar.data.imagen}`}
            alt="imagen"
            className="avatar"
          />
          <button onClick={borrandoAvatar}>Borrar</button>
        </div>
      ) : (
        <p>Imagen no disponible</p>
      )}
      {status === "error" && <p className="api">{message}</p>}
      {status === "ok" && <p className="api">{message}</p>}
    </section>
  );
}

export default BorrarAvatar;
