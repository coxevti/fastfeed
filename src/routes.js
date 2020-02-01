import express, { Router } from 'express';
import { resolve } from 'path';
import multer from 'multer';

import authMiddleware from './app/middlewares/authMiddleware';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';

import userStoreValidation from './app/validations/userStore';
import userUpdateValidation from './app/validations/userUpdate';
import recipientStoreValidation from './app/validations/recipientStore';
import recipientUpdateValidation from './app/validations/recipientUpdate';
import fileStoreValidation from './app/validations/fileStore';

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

export default routes;
