'use strict';

const { registrationSchema } = require('../../schemas');
const {
  validar,
  generarCodigoRandom,
  enviarMail,
  generarError,
} = require('../../helpers');
const getDB = require('../../db/db');

const nuevoUsuario = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    await validar(registrationSchema, req.body);

    const { email, password, avatar } = req.body;

    const [existeUsuario] = await connection.query(
      `
      SELECT id
      FROM users
      WHERE email = ?
    `,
      [email]
    );

    if (existeUsuario.length > 0) {
      generarError('Ya existe un usuario con este email.', 409);
    }

    const registrationCode = generarCodigoRandom(40);

    const bodyEmail = `
      Acabas de registrarte en Bilbao_accesible.
      Pulsa en este enlace para validar tu cuenta: ${process.env.PUBLIC_HOST}/usuarios/validar/${registrationCode}
    `;

    enviarMail({
      to: email,
      subject: 'Correo de activación de usuario.',
      body: bodyEmail,
    });

    await connection.query(
      `
      INSERT INTO users (created_at, avatar, email, password, registrationCode)
      VALUES (CURRENT_TIMESTAMP, ?, ?, SHA2(?, 512), ?)
    `,
      [avatar, email, password, registrationCode]
    );

    res.status(201).send({
      status: 'ok.',
      message: 'Usuario creado, comprueba tu correo para validar tu cuenta.',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = nuevoUsuario;
