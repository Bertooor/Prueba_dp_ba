'use strict';

const getDB = require('../../db/db');
const { generarError } = require('../../helpers');

const usuarioInfo = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

    const [usuario] = await connection.query(
      `
      SELECT id, created_at AS fecha_registro, email, avatar
      FROM users
      WHERE id = ?
    `,
      [id]
    );

    // const [imagen] = await connection.query(
    //   `
    //   SELECT photo, id
    //   FROM users_avatar
    //   WHERE user_id = ?
    // `,
    //   [id]
    // );

    if (req.userAuth.id !== usuario[0].id && req.userAuth.role !== 'admin') {
      generarError('No dispones de permisos para esta acción', 403);
    }

    const usuarioInf = {
      avatar: usuario[0].avatar,
      id: usuario[0].id,
      email: usuario[0].email,
      fecha_registro: usuario[0].fecha_registro,
    };

    // const imagenInf = {
    //   imagen: imagen[0].photo,
    //   imagen_id: imagen[0].id,
    // };

    res.send({
      status: 'ok.',
      message: 'Información usuario.',
      data: {
        ...usuarioInf,
        // ...imagenInf,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = usuarioInfo;
