'use strict';

const getDB = require('../../db/db');
const { generarError, borrarFoto } = require('../../helpers');

const borraUsuario = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

    if (Number(id) === 1) {
      generarError('El administrador principal no se puede eliminar.', 403);
    }

    if (req.userAuth.id !== Number(id) && req.userAuth.role !== 'admin') {
      generarError('No tienes permisos para eliminar a este usuario.', 401);
    }

    await connection.query(
      `
      DELETE
      FROM places_complaints
      WHERE user_id = ?
    `,
      [id]
    );

    const [avatar] = await connection.query(
      `
      SELECT photo
      FROM users_avatar
      WHERE user_id = ?
    `,
      [id]
    );

    //Elimino el usuario de la base de datos y el avatar del directorio de las imagenes, en caso de existir.

    if (avatar && avatar.length > 0) {
      await borrarFoto(avatar[0].photo);
    }

    await connection.query(
      `
      DELETE
      FROM users_avatar
      WHERE user_id = ?
    `,
      [id]
    );

    await connection.query(
      `
        DELETE
        FROM users
        WHERE id = ?
        `,
      [id]
    );

    res.send({
      status: 'ok.',
      message: `El usuario con id: ${id}, ha sido borrado de la base de datos.`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = borraUsuario;
