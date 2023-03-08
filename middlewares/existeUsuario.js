'use strict';

const getDB = require('../db/db');
const { generarError } = require('../helpers');

const existeUsuario = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const { id } = req.params;

    const [comprobarId] = await connection.query(
      `
        SELECT id
        FROM users
        WHERE id = ?
    `,
      [id]
    );

    if (comprobarId.length === 0) {
      generarError('Usuario no encontrado.', 404);
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = existeUsuario;
