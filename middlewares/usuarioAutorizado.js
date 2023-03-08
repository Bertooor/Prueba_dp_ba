'use strict';

const getDB = require('../db/db');
const jwt = require('jsonwebtoken');
const { generarError } = require('../helpers');

const usuarioAutorizado = async (req, res, next) => {
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
      generarError('Token no valido', 401);
    }

    const [usuario] = await connection.query(
      `
      SELECT lastAuthUpdate
      FROM users
      WHERE id = ?
    `,
      [tokenInfo.id]
    );

    const lastAuthUpdate = usuario[0].lastAuthUpdate;
    const ultimaCreacionToken = tokenInfo.iat;

    if (ultimaCreacionToken < Date.parse(lastAuthUpdate) / 1000) {
      generarError('Token caducado.', 401);
    }

    req.userAuth = tokenInfo;
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = usuarioAutorizado;
