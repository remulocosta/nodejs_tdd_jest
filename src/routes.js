const routes = require('express').Router();

const SessionController = require('./app/controllers/SessionController');

 // Definições de Rotas
 routes.post('/sessions', SessionController.strore);


module.exports = routes;
