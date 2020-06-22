const express = require ('express');
const TreeController = require('./controllers/TreeController');
const PersonsController = require('./controllers/PersonsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const connection = require ('./database/connection');
const routes = express.Router();

routes.get('/trees',TreeController.index);
routes.post('/trees',TreeController.create);

routes.post('/session',SessionController.create);
routes.get('/session',SessionController.index);

routes.get('/profile',ProfileController.index);

routes.get('/persons',PersonsController.index);
routes.post('/persons',PersonsController.create);
//routes.delete('/persons/:id_person',PersonsController.delete);

module.exports = routes;