'use strict';

const getDB = require('../../db/db');
const {
  generarError,
  generarCodigoRandom,
  enviarMail,
  validar,
} = require('../../helpers');
const { usuarioSchema } = require('../../schemas');

const editaUsuario = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

    if (req.userAuth.id !== Number(id) && req.userAuth.role !== 'admin') {
      generarError('No tienes permisos para editar este usuario.', 403);
    }

    const [infoUsuario] = await connection.query(
      `
        SELECT email
        FROM users
        WHERE id = ?
      `,
      [id]
    );

    await validar(usuarioSchema, req.body);

    const { email, avatar } = req.body;

    //Si el usuario cambia el mail, se comprueba que el nuevo mail no exista.

    if (email !== infoUsuario[0].email) {
      const [existeMail] = await connection.query(
        `
          SELECT id
          FROM users
          WHERE email = ?
        `,
        [email]
      );

      if (existeMail.length > 0) {
        generarError('Ya existe un usuario con el email proporcionado.', 409);
      }

      const registrationCode = generarCodigoRandom(30);

      const emailBody = `
        Acabas de modificar tu email en Bilbao_accesible.
        Pulsa en este link para validar tu nuevo email: ${process.env.PUBLIC_HOST}/usuarios/validar/${registrationCode}
      `;

      await enviarMail({
        to: email,
        subject: 'Confirma tu nuevo email.',
        body: emailBody,
      });

      await connection.query(
        `
          UPDATE users
          SET avatar = ?, email = ?, lastAuthUpdate = ?, active = 0, registrationCode = ? 
          WHERE id = ?
        `,
        [avatar, email, new Date(), registrationCode, id]
      );

      res.send({
        status: 'ok.',
        message:
          'Datos de usuario actualizados. Revisa tu email para validar los nuevos datos.',
      });

      //Sino cambia el mail se editan los cambios en la base de datos.
    } else {
      await connection.query(
        `
          UPDATE users
          SET avatar = ?, lastAuthUpdate = ?
          WHERE id = ?
        `,
        [avatar, new Date(), id]
      );

      res.send({
        status: 'ok.',
        message:
          'Datos de usuario actualizados. Vuelve a logearte para actualizar tus datos.',
      });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editaUsuario;
