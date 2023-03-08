'use strict';

const Joi = require('joi');

const registrationSchema = Joi.object().keys({
  email: Joi.string().required().email().max(100),
  avatar: Joi.string().max(50).required(),
  password: Joi.string()
    .required()
    .min(6)
    .max(20)
    .error(new Error(`La contraseña debe tener entre 6 y 20 caracteres.`)),
});

const adminSchema = Joi.object().keys({
  email: Joi.string().required().email().max(100),
  password: Joi.string().required().min(6).max(20),
});

const placeSchema = Joi.object().keys({
  title: Joi.string().required().max(100),
  city: Joi.string().required().max(100),
  distric: Joi.string().required().max(100),
  description: Joi.string().required(),
  problem_solved: Joi.string().optional(),
});

const contrasenaSchema = Joi.object().keys({
  antiguaContrasena: Joi.string().required().min(6).max(20),
  nuevaContrasena: Joi.string().required().min(6).max(20),
});

const usuarioSchema = Joi.object().keys({
  email: Joi.string().required().email().max(100),
  avatar: Joi.string().max(100),
});

const loginUsuarioSchema = Joi.object().keys({
  email: Joi.string().required().email().max(100),
  password: Joi.string().required().min(6).max(20),
});

module.exports = {
  registrationSchema,
  adminSchema,
  placeSchema,
  contrasenaSchema,
  usuarioSchema,
  loginUsuarioSchema,
};
