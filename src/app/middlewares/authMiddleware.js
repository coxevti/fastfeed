import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (request, response, next) => {
  try {
    const { authorization } = request.headers;
    const [, token] = authorization.split(' ');
    if (!token) {
      return response.status(401).json({ message: 'Token not provided' });
    }
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    request.userId = decoded.id;
    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Token invalid' });
  }
};
