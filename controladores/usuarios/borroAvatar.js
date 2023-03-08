'use strict';

const getDB = require('../../db/db');
const { generarError, borrarFoto } = require('../../helpers');

const borroAvatar = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id, avatarId } = req.params;

    const [avatar] = await connection.query(
      `
            SELECT photo
            FROM users_avatar
            WHERE id = ? AND user_id = ?
        `,
      [avatarId, id]
    );

    if (avatar.length === 0) {
      generarError('La imagen del avatar no existe.', 404);
    }

    await borrarFoto(avatar[0].photo);

    await connection.query(
      `
            DELETE
            FROM users_avatar
            WHERE id = ? AND user_id = ?
        `,
      [avatarId, id]
    );

    res.send({
      status: 'ok.',
      message:
        'Imagen avatar borrada. Vuelve a logearte para actualizar tus datos.',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = borroAvatar;
