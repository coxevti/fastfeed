import express, { Router } from 'express';
import { resolve } from 'path';
import multer from 'multer';

import authMiddleware from './app/middlewares/authMiddleware';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import OrderController from './app/controllers/OrderController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

import userValidation from './app/validations/user';
import recipientValidation from './app/validations/recipient';
import fileValidation from './app/validations/file';
import deliverymanValidation from './app/validations/Deliveryman';
import orderValidation from './app/validations/Order';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', userValidation.store, UserController.store);
routes.post('/sessions', SessionController.store);
routes.use(
  '/files',
  express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
);

routes.use(authMiddleware);

routes.put('/users', userValidation.update, UserController.update);

routes.get('/recipients', RecipientController.index);
routes.post(
  '/recipients',
  recipientValidation.store,
  RecipientController.store
);
routes.put(
  '/recipients/:id',
  recipientValidation.update,
  RecipientController.update
);

routes.post(
  '/files',
  upload.single('file'),
  fileValidation.store,
  FileController.store
);

routes.get('/deliverers', DeliverymanController.index);
routes.get('/deliverers/:id/deliveries', DeliveryController.index);
routes.post(
  '/deliverers',
  deliverymanValidation.store,
  DeliverymanController.store
);
routes.post('/deliverers/:id/orders', DeliveryController.store);
routes.put('/deliverers/:id', DeliverymanController.update);
routes.delete('/deliverers/:id', DeliverymanController.destroy);

routes.get('/orders', orderValidation.index, OrderController.index);
routes.post('/orders', orderValidation.store, OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.destroy);

routes.get('/delivery/all/problems', DeliveryProblemController.index);
routes.post('/delivery/:id/problems', DeliveryProblemController.store);
routes.delete(
  '/problems/:id/cancel-delivery',
  DeliveryProblemController.destroy
);

export default routes;
