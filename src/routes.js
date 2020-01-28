import { Router } from 'express';

const routes = new Router();

routes.get('/', (request, response) => {
  response.json({ message: 'FastFeet' });
});

export default routes;
