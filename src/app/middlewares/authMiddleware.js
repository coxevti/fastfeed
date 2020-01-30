import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (request, response, next) => {
  const { authorization } = request.headers;
  if (typeof authorization !== 'undefined') {
    const [, token] = authorization.split(' ');
    if (!token) {
      return response.status(401).json({ message: 'Token not provided' });
    }
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    request.userId = decoded.id;
    return next();
  }
  return response.status(500).json({ message: 'Not authorized' });
};
