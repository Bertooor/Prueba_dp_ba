'use strict';

const getDB = require('../../db/db');

const { guardarFoto, generarError } = require('../../helpers');

const fotoLugar = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

    const [imagenId] = await connection.query(
      `
            SELECT id
            FROM places_photos
            WHERE place_id = ?
        `,
      [id]
    );

    if (imagenId.length >= 3) {
      generarError(
        'No puedes subir más fotos a este lugar, a no ser que borres alguna.',
        403
      );
    }

    let fotoGuardada;

    if (req.files && Object.keys(req.files).length > 0) {
      fotoGuardada = await guardarFoto(Object.values(req.files)[0]);

      await connection.query(
        `
            INSERT INTO places_photos (uploadDate, photo, place_id)
            VALUES (CURRENT_TIMESTAMP,?,?)
           `,
        [fotoGuardada, id]
      );
    }

    res.send({
      status: 'ok.',
      message: 'Imagen añadida.',
      data: {
        nombreImagen: fotoGuardada,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = fotoLugar;
