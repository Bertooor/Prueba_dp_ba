'use strict';

const getDB = require('../../db/db');

const { borrarFoto, generarError } = require('../../helpers');

const borraFotoSugerencia = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id, imagenId } = req.params;

    const [imagen] = await connection.query(
      `
            SELECT photo
            FROM suggestions_photos
            WHERE id = ? AND suggestion_id = ?
        `,
      [imagenId, id]
    );

    if (imagen.length === 0) {
      generarError('La foto no existe.', 404);
    }

    await borrarFoto(imagen[0].photo);

    await connection.query(
      `
            DELETE 
            FROM suggestions_photos
            WHERE id = ? AND suggestion_id = ?
        `,
      [imagenId, id]
    );

    res.send({
      status: 'ok.',
      message: 'Imagen borrada.',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = borraFotoSugerencia;
