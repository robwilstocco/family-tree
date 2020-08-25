import express from 'express';
import TreeController from './controllers/TreeController';
import PersonsController from './controllers/PersonsController';
import ProfileController from './controllers/ProfileController';
import SessionController from './controllers/SessionController';
const routes = express.Router();

const treeController = new TreeController();
const personsController = new PersonsController();
const profileController = new ProfileController();
const sessionController = new SessionController();

routes.get('/trees',treeController.index);
routes.post('/trees',treeController.create);

routes.post('/session',sessionController.create);
routes.get('/session',sessionController.index);

routes.get('/profile',profileController.index);

routes.get('/persons',personsController.index);
routes.post('/persons',personsController.create);
routes.delete('/persons/:id_person',personsController.delete);

export default routes;