'use strict';

const jwt = require('jsonwebtoken');

const getDB = require('../../db/db');
const { validar, generarError } = require('../../helpers');
const { loginUsuarioSchema } = require('../../schemas');

const loginUsuario = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    await validar(loginUsuarioSchema, req.body);

    const { email, password } = req.body;

    const [usuario] = await connection.query(
      `
      SELECT id, role, active, avatar
      FROM users
      WHERE email = ? AND password = SHA2(?, 512)
    `,
      [email, password]
    );

    if (usuario.length === 0) {
      generarError('Email o password no correctos.', 401);
    }

    if (!usuario[0].active) {
      generarError('Usuario pendiente de validación, revise su correo.', 401);
    }

    const info = {
      id: usuario[0].id,
      role: usuario[0].role,
    };

    const token = jwt.sign(info, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.send({
      status: 'ok.',
      data: {
        token,
        ...usuario[0],
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = loginUsuario;
