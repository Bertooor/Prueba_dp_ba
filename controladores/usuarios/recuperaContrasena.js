'use strict';

const getDB = require('../../db/db');
const {
  generarError,
  generarCodigoRandom,
  enviarMail,
} = require('../../helpers');

//Esta ruta te devuelve un código por medio de un mail, que tendrás que introducir en el body de la ruta nuevaContrasena, junto con la nueva contrasena del usuario.

const recuperaContrasena = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { email } = req.body;

    if (!email) {
      generarError('Escribe tu email, por favor.', 400);
    }

    const [confirmaEmail] = await connection.query(
      `
            SELECT id
            FROM users
            WHERE email = ?
        `,
      [email]
    );

    if (confirmaEmail.length === 0) {
      generarError('No hay ningún usuario registrado con este email.');
    }

    const recoverCode = generarCodigoRandom(40);

    const emailBody = `
      Se solicitó un cambio de contraseña para el usuario registrado con este email en Bilbao_accesible.

      El código de recuperación es: ${recoverCode}.

      Si no fuiste tu el que solicitó el cambio, ignora este email y sigue con tu contraseña habitual.

      ¡ Gracias !
    `;

    await connection.query(
      `
            UPDATE users
            SET recoverCode = ? 
            WHERE email = ?
        `,
      [recoverCode, email]
    );

    await enviarMail({
      to: email,
      subject: `Cambio de contraseña en Bilbao_accesible.`,
      body: emailBody,
    });

    res.send({
      status: 'ok.',
      message: 'Revisa tu correo para cambiar tu contraseña.',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = recuperaContrasena;
