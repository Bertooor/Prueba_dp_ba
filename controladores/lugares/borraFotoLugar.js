'use strict';

const getDB = require('../../db/db');

const { borrarFoto, generarError } = require('../../helpers');

const borraFotoLugar = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id, imagenId } = req.params;

    const [imagen] = await connection.query(
      `
            SELECT photo
            FROM places_photos
            WHERE id = ? AND place_id = ?
        `,
      [imagenId, id]
    );

    if (imagen.length === 0) {
      generarError('La foto no existe', 404);
    }

    await borrarFoto(imagen[0].photo);

    await connection.query(
      `
            DELETE 
            FROM places_photos
            WHERE id = ? AND place_id = ?
        `,
      [imagenId, id]
    );

    res.send({
      status: 'ok.',
      message: 'Foto borrada.',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = borraFotoLugar;
