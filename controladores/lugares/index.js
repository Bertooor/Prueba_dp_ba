'use strict';

const lugar = require('./lugar');
const lugares = require('./lugares');
const nuevoLugar = require('./nuevoLugar');
const editaLugar = require('./editaLugar');
const denunciaLugar = require('./denunciaLugar');
const borraLugar = require('./borraLugar');
const fotoLugar = require('./fotoLugar');
const borraFotoLugar = require('./borraFotoLugar');

module.exports = {
  denunciaLugar,
  lugar,
  lugares,
  nuevoLugar,
  editaLugar,
  borraLugar,
  fotoLugar,
  borraFotoLugar,
};
