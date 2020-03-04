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

import userStoreValidation from './app/validations/userStore';
import userUpdateValidation from './app/validations/userUpdate';
import recipientStoreValidation from './app/validations/recipientStore';
import recipientUpdateValidation from './app/validations/recipientUpdate';
import fileStoreValidation from './app/validations/fileStore';
import deliverymanStoreValidation from './app/validations/DeliverymanStore';
import orderStoreValidation from './app/validations/OrderStore';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', userStoreValidation, UserController.store);
routes.post('/sessions', SessionController.store);
routes.use(
  '/files',
  express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
);

routes.use(authMiddleware);

routes.put('/users', userUpdateValidation, UserController.update);

routes.post('/recipients', recipientStoreValidation, RecipientController.store);
routes.put(
  '/recipients/:id',
  recipientUpdateValidation,
  RecipientController.update
);

routes.post(
  '/files',
  upload.single('file'),
  fileStoreValidation,
  FileController.store
);

routes.get('/deliverers', DeliverymanController.index);
routes.get('/deliverers/:id/deliveries', DeliveryController.index);
routes.post(
  '/deliverers',
  deliverymanStoreValidation,
  DeliverymanController.store
);
routes.post('/deliverers/:id/orders', DeliveryController.store);
routes.put('/deliverers/:id', DeliverymanController.update);
routes.delete('/deliverers/:id', DeliverymanController.destroy);

routes.get('/orders', OrderController.index);
routes.post('/orders', orderStoreValidation, OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.destroy);

export default routes;
