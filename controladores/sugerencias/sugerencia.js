'use strict';

const getDB = require('../../db/db');

const sugerencia = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const { id } = req.params;

    const [datosSugerencia] = await connection.query(
      `
      SELECT id, created_at AS fecha, title AS título, description AS descripción, city AS ciudad, distric AS barrio
      FROM suggestions
      WHERE id = ?
    `,
      [id]
    );

    const [imagenes] = await connection.query(
      `
      SELECT id, uploadDate AS fecha, photo AS imagen, suggestion_id AS sugerencia_id
      FROM suggestions_photos
      WHERE suggestion_id = ?
    `,
      [id]
    );

    res.send({
      status: 'ok.',
      message: 'Detalles de la sugerencia.',
      data: {
        ...datosSugerencia[0],
        imagenes,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = sugerencia;
