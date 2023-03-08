'use strict';

const getDB = require('../../db/db');

const { borrarFoto } = require('../../helpers');

const borraLugar = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

    const [imagenes] = await connection.query(
      `
        SELECT photo 
        FROM places_photos
        WHERE place_id = ?
    `,
      [id]
    );

    //Borramos las imágenes del directorio de imágenes y de la base de datos junto con los datos del lugar y las denuncias.

    await connection.query(
      `
        DELETE
        FROM places_photos
        WHERE place_id = ?
    `,
      [id]
    );

    for (const item of imagenes) {
      await borrarFoto(item.photo);
    }

    await connection.query(
      `
        DELETE 
        FROM places_complaints
        WHERE place_id = ?
    `,
      [id]
    );

    await connection.query(
      `
        DELETE FROM places WHERE id = ?
    `,
      [id]
    );

    res.send({
      status: 'ok.',
      message: `El lugar con id ${id} y todos sus elementos relacionados, fueron borrados de la base de datos.`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = borraLugar;
