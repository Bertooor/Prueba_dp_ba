'use strict';

const getDB = require('../../db/db');

const lugares = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const [lugares] = await connection.query(
      `
      SELECT places.id AS id, places.title AS título, places.distric AS barrio, (
        SELECT places_photos.photo
        FROM places_photos
        WHERE places.id = places_photos.place_id
        LIMIT 1) AS portada
        FROM places
      `
    );

    res.send({
      status: 'ok.',
      message: 'Listado de lugares.',
      data: {
        lugares,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = lugares;
