import { useEffect, useState } from "react";
import { useUser } from "../../UserContext";

function ListaBorrarProblema() {
  const [problema, setProblema] = useState();
  const user = useUser();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_API}/lugares`);
      const data = await res.json();
      setProblema(data.data.lugares);
    })();
  }, []);

  const borrarProblema = async (id) => {
    await fetch(`${process.env.REACT_APP_API}/lugares/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: user.data.token,
      },
    });

    setProblema(problema.filter((prob) => prob.id !== id));
  };

  return (
    <section className="borrar_problema">
      {problema?.map((pro) => (
        <div className="tarjeta_problemas" key={pro.id}>
          <h3>{pro.título}</h3>
          <img
            src={`${process.env.REACT_APP_API}/${pro.portada}`}
            alt="imagen"
          />
          <p>
            <button
              onClick={() => {
                borrarProblema(pro.id);
              }}
            >
              Borrar
            </button>
          </p>
        </div>
      ))}
    </section>
  );
}

export default ListaBorrarProblema;
