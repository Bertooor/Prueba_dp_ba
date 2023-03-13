import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function UsuarioValidado() {
  const [status, setStatus] = useState();
  const [message, setMessage] = useState();
  const { registrationCode } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API}/usuarios/validar/${registrationCode}`
      );
      const data = await res.json();
      setMessage(data);
      setStatus(data);
      console.log("datos: ", data);
    })();
  }, [registrationCode]);
  return (
    <section className="zona_usuario">
      {status === "error" && <p className="api">{message}</p>}
      {status === "ok" && <p className="api">{message}</p>}
    </section>
  );
}

export default UsuarioValidado;
