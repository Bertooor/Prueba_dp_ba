'use strict';

const getDB = require('../../db/db');

const lugar = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const { id } = req.params;

    const [datosLugar] = await connection.query(
      `
      SELECT id, created_at AS fecha, title AS título, description AS descripción, city AS ciudad, distric AS barrio, problem_solved AS problema_resuelto
      FROM places
      WHERE id = ?
      `,
      [id]
    );

    const [imagenes] = await connection.query(
      `
      SELECT id, uploadDate AS fecha, photo AS imagen, place_id AS id_lugar
      FROM places_photos
      WHERE place_id = ?
      `,
      [id]
    );

    const [numDenunciasLugar] = await connection.query(
      `
      SELECT count(id) AS denuncias_lugar
      FROM places_complaints
      WHERE place_id = ?
      `,
      [id]
    );

    res.send({
      status: 'ok.',
      message: 'Detalles del lugar.',
      data: {
        ...datosLugar[0],
        ...numDenunciasLugar[0],
        imagenes,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = lugar;
