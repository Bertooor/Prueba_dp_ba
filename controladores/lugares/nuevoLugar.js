'use strict';

const getDB = require('../../db/db');
const { guardarFoto, generarError, validar } = require('../../helpers');
const { placeSchema } = require('../../schemas');

const nuevoLugar = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    await validar(placeSchema, req.body);

    const { title, city, distric, description } = req.body;

    if (!title || !description || !city || !distric) {
      generarError('Te falta algún campo obligatorio por rellenar.', 400);
    }

    const [datosLugar] = await connection.query(
      `
      INSERT INTO places ( title, city, distric, description, user_id)
      VALUES (?,?,?,?,?);
      `,
      [title, city, distric, description, 1]
    );

    const { insertId } = datosLugar;
    console.log('insertId', insertId);
    console.log('datosLugar', datosLugar);
    //Insertamos las imágenes en la base de datos y en el directorio de imágenes, previamente creado, con un máximo de 3 imágenes.

    if (req.files && Object.keys(req.files).length > 0) {
      for (const imagen of Object.values(req.files).slice(0, 3)) {
        const nombreFoto = await guardarFoto(imagen);
        await connection.query(
          `
          INSERT INTO places_photos(uploadDate, photo, place_id)
          VALUES(CURRENT_TIMESTAMP,?,?);
          `,
          [nombreFoto, insertId]
        );
      }
    }

    res.send({
      status: 'ok.',
      message: 'Nuevo lugar añadido.',
      data: {
        id: insertId,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = nuevoLugar;
