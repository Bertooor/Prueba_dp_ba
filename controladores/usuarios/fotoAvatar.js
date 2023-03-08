'use strict';

const getDB = require('../../db/db');
const { generarError, guardarFoto } = require('../../helpers');

const fotoAvatar = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

    const [avatarUsuario] = await connection.query(
      `
            SELECT id
            FROM users_avatar
            WHERE user_id = ?
        `,
      [id]
    );

    //Si no existe ninguna imagen de avatar en la base de datos, se añade a la base de datos y al directorio de las imágenes.

    if (avatarUsuario.length > 0) {
      generarError('Solo puedes tener una imagen de tu avatar.', 403);
    }

    let fotoGuardada;

    if (req.files && Object.keys(req.files).length > 0) {
      fotoGuardada = await guardarFoto(Object.values(req.files)[0]);

      await connection.query(
        `
                INSERT INTO users_avatar (uploadDate, photo, user_id)
                VALUES (CURRENT_TIMESTAMP, ?, ?)
            `,
        [fotoGuardada, id]
      );
    }

    res.send({
      status: 'ok.',
      message:
        'Imagen avatar añadida. Vuelve a logearte para actualizar tus datos.',
      data: {
        imagen: fotoGuardada,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = fotoAvatar;
