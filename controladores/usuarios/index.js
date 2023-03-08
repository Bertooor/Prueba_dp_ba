'use strict';

const nuevoUsuario = require('./nuevoUsuario');
const usuarioValidado = require('./usuarioValidado');
const loginUsuario = require('./loginUsuario');
const usuarioInfo = require('./usuarioInfo');
const editaContrasenaUsuario = require('./editaContrasenaUsuario');
const borraUsuario = require('./borraUsuario');
const editaUsuario = require('./editaUsuario');
const recuperaContrasena = require('./recuperaContrasena');
const nuevaContrasena = require('./nuevaContrasena');
const fotoAvatar = require('./fotoAvatar');
const borroAvatar = require('./borroAvatar');
const loginAdmin = require('./loginAdmin');
const usuarioAvatar = require('./usuarioAvatar');

module.exports = {
  nuevoUsuario,
  usuarioValidado,
  loginUsuario,
  usuarioInfo,
  editaContrasenaUsuario,
  borraUsuario,
  editaUsuario,
  recuperaContrasena,
  nuevaContrasena,
  fotoAvatar,
  borroAvatar,
  loginAdmin,
  usuarioAvatar,
};
