import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../UserContext";
import "./Admin.css";

function AñadirImagen() {
  const user = useUser();
  const { id } = useParams();

  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("photo", photo);

    const res = await fetch(
      `${process.env.REACT_APP_API}/lugares/${id}/imagenes`,
      {
        method: "POST",
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
      setPhoto();
    }
  };

  return (
    <section className="nuevo_problema">
      <h2>Nueva imagen</h2>
      <form onSubmit={handleSubmit} className="form_nuevo">
        <label>
          <span>Imagen:</span>
          <input
            required
            name="photo"
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </label>
        <button>Subir</button>
        {status === "error" && <p className="api">{message}</p>}
        {status === "ok" && <p className="api">{message}</p>}
      </form>
    </section>
  );
}

export default AñadirImagen;
