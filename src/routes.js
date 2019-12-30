const routes = require('express').Router();

const authMiddleware = require('./app/middleware/auth');

const SessionController = require('./app/controllers/SessionController');

 // Definições de Rotas
 routes.post('/sessions', SessionController.strore);

 routes.use(authMiddleware);

 routes.get('/dashboard', (req, res) => {
   return res.status(200).send();
 })


module.exports = routes;
