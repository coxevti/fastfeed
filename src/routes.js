import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import userStoreValidation from './app/validations/userStore';
import userUpdateValidation from './app/validations/userUpdate';
import recipientStoreValidation from './app/validations/recipientStore';
import recipientUpdateValidation from './app/validations/recipientUpdate';

const routes = new Router();

routes.post('/users', userStoreValidation, UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', userUpdateValidation, UserController.update);

routes.post('/recipients', recipientStoreValidation, RecipientController.store);
routes.put(
  '/recipients/:id',
  recipientUpdateValidation,
  RecipientController.update
);

export default routes;
