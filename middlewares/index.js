'use strict';

const puedeEditarLugar = require('./puedeEditarSugerencia');
const usuarioAutorizado = require('./usuarioAutorizado');
const existeLugar = require('./existeLugar');
const existeUsuario = require('./existeUsuario');
const esAdmin = require('./esAdmin');
const existeSugerencia = require('./existeSugerencia');
const puedeEditarSugerencia = require('./puedeEditarSugerencia');

module.exports = {
  puedeEditarLugar,
  usuarioAutorizado,
  existeLugar,
  existeUsuario,
  esAdmin,
  existeSugerencia,
  puedeEditarSugerencia,
};
