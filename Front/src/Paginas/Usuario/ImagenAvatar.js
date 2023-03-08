import { useEffect, useState } from "react";
import { useUser } from "../../UserContext";
import "../../Cabecera/Cabecera.css";

function ImagenAvatar() {
  const user = useUser();
  const [avatar, setAvatar] = useState();

  const imagenDefecto = (
    <img
      className="avatar"
      src="/avatar-removebg-preview.png"
      alt="imagen avatar"
    />
  );

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
  }, [user.data.token, user.data.id]);

  if (!avatar?.data) return imagenDefecto;
  return (
    <div>
      {!avatar.data ? (
        <img
          className="avatar"
          src="/avatar-removebg-preview.png"
          alt="imagen avatar"
        />
      ) : (
        <img
          src={`${process.env.REACT_APP_API}/${avatar.data.imagen}`}
          alt="imagen"
          className="avatar"
        />
      )}
    </div>
  );
}

export default ImagenAvatar;
