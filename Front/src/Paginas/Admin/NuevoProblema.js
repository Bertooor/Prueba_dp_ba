import { useState } from "react";
import { useUser } from "../../UserContext";
import "./Admin.css";

function NuevoProblema() {
  const user = useUser();

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [distric, setDistric] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState();
  const [photo1, setPhoto1] = useState();
  const [photo2, setPhoto2] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("city", city);
    formData.append("distric", distric);
    formData.append("description", description);
    formData.append("photo", photo);
    formData.append("photo1", photo1);
    formData.append("photo2", photo2);

    const res = await fetch(`${process.env.REACT_APP_API}/lugares`, {
      method: "POST",
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
      setTitle("");
      setCity("");
      setDistric("");
      setDescription("");
    }
  };

  return (
    <section className="nuevo_problema">
      <h2>Nuevo problema</h2>
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
            rows="20"
            cols="100"
            required
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          <span>Portada:</span>
          <input
            required
            name="photo"
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </label>
        <label>
          <span>Imagen 1:</span>
          <input
            required
            name="photo1"
            type="file"
            onChange={(e) => setPhoto1(e.target.files[0])}
          />
        </label>
        <label>
          <span>Imagen 2:</span>
          <input
            required
            name="photo2"
            type="file"
            onChange={(e) => setPhoto2(e.target.files[0])}
          />
        </label>
        <button>Subir</button>
        {status === "error" && <p className="api">{message}</p>}
        {status === "ok" && <p className="api">{message}</p>}
      </form>
    </section>
  );
}

export default NuevoProblema;
