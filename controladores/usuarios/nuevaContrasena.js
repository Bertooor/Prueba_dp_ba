'use strict';

const getDB = require('../../db/db');
const { generarError } = require('../../helpers');

const nuevaContrasena = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { recoverCode, nuevaContrasena } = req.body;

    if (!recoverCode || !nuevaContrasena) {
      generarError('Faltan campos por completar.', 400);
    }

    const [comprobacionUsuario] = await connection.query(
      `
            SELECT id
            FROM users
            WHERE recoverCode = ?
        `,
      [recoverCode]
    );

    if (comprobacionUsuario.length === 0) {
      generarError('Código de recuperación incorrecto.', 404);
    }

    await connection.query(
      `
            UPDATE users
            SET password = SHA2(?, 512), lastAuthUpdate = ?, recoverCode = NULL
            WHERE id = ?
        `,
      [nuevaContrasena, new Date(), comprobacionUsuario[0].id]
    );

    res.send({
      status: 'ok.',
      message: 'Contraseña cambiada con éxito.',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = nuevaContrasena;
