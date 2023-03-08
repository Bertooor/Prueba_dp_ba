'use strict';

const getDB = require('../db/db');
const { generarError } = require('../helpers');

const puedeEditarSugerencia = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const { id } = req.params;

    const [idUsuario] = await connection.query(
      `
      SELECT user_id
      FROM suggestions
      WHERE id = ?
    `,
      [id]
    );

    if (
      req.userAuth.id !== idUsuario[0].user_id &&
      req.userAuth.role !== 'admin'
    ) {
      generarError(
        'No tienes los permisos para ver o editar la sugerencia.',
        401
      );
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = puedeEditarSugerencia;
