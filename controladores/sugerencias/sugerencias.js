'use strict';

const getDB = require('../../db/db');

const sugerencias = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const { buscar, datosPermitidos, ordenDatos } = req.query;

    const validarDatosPermitidos = ['city', 'distric', 'title', 'created_at'];
    const recogerDatosPermitidos = validarDatosPermitidos.includes(
      datosPermitidos
    )
      ? datosPermitidos
      : 'distric';

    const validarOrden = ['ASC', 'DESC'];
    const datosOrdenados = validarOrden.includes(ordenDatos)
      ? ordenDatos
      : 'ASC';

    let sugerencias;

    if (buscar) {
      [sugerencias] = await connection.query(
        `
        SELECT id, created_at AS fecha, title AS título, city AS ciudad, distric AS barrio
        FROM suggestions
        WHERE distric LIKE ? OR description LIKE ?
        ORDER BY ${recogerDatosPermitidos} ${datosOrdenados}
      `,
        [`%${buscar}%`, `%${buscar}%`]
      );
    } else {
      [sugerencias] = await connection.query(
        `
        SELECT id, created_at AS fecha, title AS título, city AS ciudad, distric AS barrio
        FROM suggestions
        ORDER BY ${recogerDatosPermitidos} ${datosOrdenados}
        `
      );
    }

    res.send({
      status: 'ok.',
      message: 'Listado de sugerencias de lugares.',
      data: sugerencias,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = sugerencias;
