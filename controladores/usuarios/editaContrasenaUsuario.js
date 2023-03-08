'use strict';

const getDB = require('../../db/db');
const { generarError, validar } = require('../../helpers');
const { contrasenaSchema } = require('../../schemas');

const editaContrasenaUsuario = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    await validar(contrasenaSchema, req.body);

    const { antiguaContrasena, nuevaContrasena } = req.body;

    const [contrasenaUsuario] = await connection.query(
      `
        SELECT id
        FROM users
        WHERE id = ? AND password = SHA2(?, 512)
    `,
      [req.userAuth.id, antiguaContrasena]
    );

    if (contrasenaUsuario.length === 0) {
      generarError('Antigua contraseña, no correcta.', 401);
    }

    await connection.query(
      `
        UPDATE users
        SET password = SHA2(?, 512), lastAuthUpdate = ?
        WHERE id = ?
    `,
      [nuevaContrasena, new Date(), req.userAuth.id]
    );

    res.send({
      status: 'ok.',
      message: 'Contraseña cambiada.',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editaContrasenaUsuario;
