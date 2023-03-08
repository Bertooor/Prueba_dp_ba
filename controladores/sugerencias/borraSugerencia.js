'use strict';

const getDB = require('../../db/db');

const { borrarFoto } = require('../../helpers');

const borraSugerencia = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

    const [imagenes] = await connection.query(
      `
        SELECT photo 
        FROM suggestions_photos
        WHERE suggestion_id = ?
    `,
      [id]
    );

    await connection.query(
      `
        DELETE
        FROM suggestions_photos
        WHERE suggestion_id = ?
    `,
      [id]
    );

    for (const item of imagenes) {
      await borrarFoto(item.photo);
    }

    await connection.query(
      `
        DELETE FROM suggestions WHERE id = ?
    `,
      [id]
    );

    res.send({
      status: 'ok.',
      message: `La sugerencia con id ${id} y todos sus elementos relacionados, fueron borrados de la base de datos.`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = borraSugerencia;
