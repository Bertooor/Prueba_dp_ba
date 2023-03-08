'use strict';

const getDB = require('../db/db');
const { generarError } = require('../helpers');
const jwt = require('jsonwebtoken');

const esAdmin = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { authorization } = req.headers;

    if (!authorization) {
      generarError('Falta la cabecera de authorization.', 401);
    }

    let tokenInfo;

    try {
      tokenInfo = jwt.verify(authorization, process.env.JWT_SECRET);
    } catch (error) {
      generarError('Token no valido.', 401);
    }

    const [usuario] = await connection.query(
      `
      SELECT role
      FROM users
      WHERE id = ?
    `,
      [tokenInfo.id]
    );

    const roleUsuario = usuario[0].role;
    const idUsuario = tokenInfo.id;

    if (idUsuario !== 1 || roleUsuario !== 'admin') {
      generarError(
        'Lo siento no tienes permisos para este tipo de acción.',
        401
      );
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = esAdmin;
