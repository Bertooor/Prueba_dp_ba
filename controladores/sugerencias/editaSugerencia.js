'use strict';

const getDB = require('../../db/db');
const { generarError, validar } = require('../../helpers');
const { placeSchema } = require('../../schemas');

const editaSugerencia = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    await validar(placeSchema, req.body);

    const { id } = req.params;

    const { title, city, distric, description } = req.body;

    if (!title || !description || !city || !distric) {
      generarError('Te falta algún campo obligatorio por rellenar.', 400);
    }

    await connection.query(
      `
        UPDATE suggestions SET title=?, city=?, distric=?, description=? 
        WHERE id=?
    `,
      [title, city, distric, description, id]
    );

    res.send({
      status: 'ok.',
      message: 'Sugerencia editada.',
      data: {
        id,
        title,
        description,
        city,
        distric,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editaSugerencia;
