'use strict';

const getDB = require('../../db/db');
const { generarError, validar } = require('../../helpers');
const { placeSchema } = require('../../schemas');

const editaLugar = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    await validar(placeSchema, req.body);

    const { id } = req.params;

    const { title, city, distric, description, problem_solved } = req.body;

    if (!title || !description || !city || !distric) {
      generarError('Te falta algún campo requerido por rellenar.', 400);
    }

    await connection.query(
      `
        UPDATE places SET title=?, city=?, distric=?, description=?, problem_solved=?
        WHERE id=?
    `,
      [title, city, distric, description, problem_solved, id]
    );

    res.send({
      status: 'ok',
      message: 'Lugar editado.',
      data: {
        id,
        title,
        description,
        city,
        distric,
        problem_solved,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editaLugar;
