'use strict';

const getDB = require('../db/db');
const { generarError } = require('../helpers');

const existeSugerencia = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const { id } = req.params;

    const [idLugar] = await connection.query(
      `
      SELECT id 
      FROM suggestions 
      WHERE id = ?
    `,
      [id]
    );

    if (idLugar.length === 0) {
      generarError('Sugerencia no encontrado.', 404);
    }
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = existeSugerencia;
