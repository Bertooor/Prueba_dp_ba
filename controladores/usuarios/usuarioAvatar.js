'use strict';

const getDB = require('../../db/db');

const usuarioAvatar = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

    const [imagen] = await connection.query(
      `
            SELECT photo, id
            FROM users_avatar
            WHERE user_id = ?
        `,
      [id]
    );

    const imagenUsuario = {
      imagen: imagen[0].photo,
      imagen_id: imagen[0].id,
    };

    res.send({
      status: 'ok.',
      message: 'Imagen de usuario.',
      data: {
        ...imagenUsuario,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = usuarioAvatar;
