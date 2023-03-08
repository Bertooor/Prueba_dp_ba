'use strict';

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');
const crypto = require('crypto');
const sgEmail = require('@sendgrid/mail');

sgEmail.setApiKey(process.env.SENDGRID_API_KEY);

const { DIRECTORIO_IMAGENES } = process.env;
const fotosDir = path.join(__dirname, DIRECTORIO_IMAGENES);

async function guardarFoto(dataFoto) {
  await fs.access(fotosDir);

  const imagen = sharp(dataFoto.data);

  const nombreImagen = `upload_${uuid.v4()}_${dataFoto.name}`;

  await imagen.toFile(path.join(fotosDir, nombreImagen));
  return nombreImagen;
}

async function borrarFoto(foto) {
  const photoPath = path.join(fotosDir, foto);
  await fs.unlink(photoPath);
}

async function validar(schema, data) {
  try {
    await schema.validateAsync(data);
  } catch (error) {
    error.httpStatus = 400;
    throw error;
  }
}

function generarCodigoRandom(byteString) {
  return crypto.randomBytes(byteString).toString('hex');
}

async function enviarMail({ to, subject, body }) {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM,
      subject,
      text: body,
      html: `
      <div>
      <h1>${subject}</h1>
      <p>${body}</p>
      </div>
      `,
    };
    await sgEmail.send(msg);
  } catch (error) {
    throw new Error('Error enviando email.');
  }
}

function generarError(msg, statusCode) {
  const error = new Error(msg);
  error.httpStatus = statusCode;
  throw error;
}

module.exports = {
  guardarFoto,
  borrarFoto,
  validar,
  generarCodigoRandom,
  enviarMail,
  generarError,
};
