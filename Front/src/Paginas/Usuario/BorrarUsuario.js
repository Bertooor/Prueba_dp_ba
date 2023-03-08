import { useUser } from "../../UserContext";
import { useState } from "react";

function BorrarUsuario() {
  const user = useUser();
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const borrarUsuario = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API}/usuarios/${user.data.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: user.data.token,
        },
      }
    );
    const data = await res.json();
    console.log("borrarUsuario", data);
    if (data.status === "error") {
      setStatus("error");
      setMessage(data.message);
    } else {
      setStatus("ok");
      setMessage(data.message);
    }
  };

  return (
    <section className="borrar_usuario">
      <h2>Borrar usuario</h2>
      <button onClick={borrarUsuario}>Borrar usuario</button>
      {status === "error" && <p className="api">{message}</p>}
      {status === "ok" && <p className="api">{message}</p>}
    </section>
  );
}

export default BorrarUsuario;
