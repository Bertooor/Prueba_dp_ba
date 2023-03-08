import { useParams } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../UserContext";
import useFetch from "fetch-suspense";

function EditarDatosProblema() {
  const user = useUser();
  const { id } = useParams();
  const problema = useFetch(`${process.env.REACT_APP_API}/lugares/` + id);

  const [title, setTitle] = useState(problema.data.título);
  const [city, setCity] = useState(problema.data.ciudad);
  const [distric, setDistric] = useState(problema.data.barrio);
  const [description, setDescription] = useState(problema.data.descripción);
  const [problem_solved, setProblem_solved] = useState(
    problema.data.problema_resuelto
  );

  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("city", city);
    formData.append("distric", distric);
    formData.append("description", description);
    formData.append("problem_solved", problem_solved ? "1" : "0");

    const res = await fetch(`${process.env.REACT_APP_API}/lugares/` + id, {
      method: "PUT",
      headers: {
        Authorization: user.data.token,
      },
      body: formData,
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
    <section className="nuevo_problema">
      <h2>Editar datos problema</h2>
      <form onSubmit={handleSubmit} className="form_nuevo">
        <label>
          <span>Título</span>
          <input
            required
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>Ciudad</span>
          <input
            required
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          <span>Barrio</span>
          <input
            required
            name="distric"
            value={distric}
            onChange={(e) => setDistric(e.target.value)}
          />
        </label>
        <label>
          <span>Descripción</span>
          <textarea
            cols={30}
            required
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          <span>Problema resuelto</span>
          <input
            type="checkbox"
            name="problem_solved"
            checked={problem_solved}
            onChange={(e) => setProblem_solved(e.target.checked)}
          />
        </label>
        <button>Sustituir</button>
        {status === "error" && <p className="api">{message}</p>}
        {status === "ok" && <p className="api">{message}</p>}
      </form>
    </section>
  );
}

export default EditarDatosProblema;
