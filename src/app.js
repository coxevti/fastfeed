import 'dotenv/config';
import express from 'express';
import Youch from 'youch';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.serve = express();
    this.middleware();
    this.routes();
    this.errorHandler();
  }

  middleware() {
    this.serve.use(express.json());
  }

  routes() {
    this.serve.use(routes);
  }

  errorHandler() {
    this.serve.use(async (error, request, response, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(error, request).toJSON();
        return response.status(500).json(errors);
      }
      return response.status(500).json({ message: 'Internal server error' });
    });
  }
}

export default new App().serve;
