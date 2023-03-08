'use strict';

const getDB = require('../../db/db');
const { guardarFoto, generarError, validar } = require('../../helpers');
const { placeSchema } = require('../../schemas');

const nuevaSugerencia = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    await validar(placeSchema, req.body);

    const { title, city, distric, description } = req.body;

    if (!title || !description || !city || !distric) {
      generarError('Te falta algún campo obligatorio por rellenar.', 400);
    }

    const [datosSugerencia] = await connection.query(
      `
        INSERT INTO suggestions ( title, city, distric, description, user_id)
        VALUES (?,?,?,?,?);
    `,
      [title, city, distric, description, req.userAuth.id]
    );

    const { insertId } = datosSugerencia;

    if (req.files && Object.keys(req.files).length > 0) {
      for (const imagen of Object.values(req.files).slice(0, 3)) {
        const nombreFoto = await guardarFoto(imagen);
        await connection.query(
          `
                INSERT INTO suggestions_photos(uploadDate, photo, suggestion_id)
                VALUES(CURRENT_TIMESTAMP,?,?);
            `,
          [nombreFoto, insertId]
        );
      }
    }

    res.send({
      status: 'ok.',
      message: 'Nueva sugerencia añadida.',
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

module.exports = nuevaSugerencia;
