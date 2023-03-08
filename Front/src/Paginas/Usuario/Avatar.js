import { useState } from "react";
import { useUser } from "../../UserContext";

function Avatar() {
  const user = useUser();

  const [avatar, setAvatar] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("avatar", avatar);

    const res = await fetch(
      `${process.env.REACT_APP_API}/usuarios/${user.data.id}/avatar`,
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
    }
  };
  return (
    <section className="imagen_avatar">
      <h2>Imagen avatar</h2>
      <form onSubmit={handleSubmit} className="form_nuevo">
        <label>
          <span>Imagen:</span>
          <input
            required
            name="photo"
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </label>
        <button>Subir</button>
        {status === "error" && <p className="api">{message}</p>}
        {status === "ok" && <p className="api">{message}</p>}
      </form>
    </section>
  );
}

export default Avatar;
