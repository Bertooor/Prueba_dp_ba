'use strict';

const getDB = require('../../db/db');
const { generarError } = require('../../helpers');

const denunciaLugar = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;
    const { denuncia } = req.body;

    if (denuncia !== 1) {
      generarError('La denuncia se hace con el "1".', 400);
    }

    const [idDenuncia] = await connection.query(
      `
            SELECT id
            FROM places_complaints
            WHERE user_id = ? AND place_id = ?
        `,
      [req.userAuth.id, id]
    );

    if (idDenuncia.length > 0) {
      generarError('Ya denunciaste este problema.', 400);
    }

    await connection.query(
      `
            INSERT INTO places_complaints (created_at, place_id, user_id)
            VALUES (CURRENT_TIMESTAMP,?,?)
        `,
      [id, req.userAuth.id]
    );

    const [numDenunciasLugar] = await connection.query(
      `
            SELECT count(id) AS denuncias_lugar
            FROM places_complaints
            WHERE place_id = ?
      `,
      [id]
    );

    const [totalDenuncias] = await connection.query(`
      SELECT count(id) AS denuncias_totales
      FROM places_complaints
    `);

    res.send({
      status: 'ok.',
      message: 'Denuncia realizada.',
      denuncias: {
        ...numDenunciasLugar[0],
        ...totalDenuncias[0],
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = denunciaLugar;
