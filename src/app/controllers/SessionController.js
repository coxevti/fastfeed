import jwt from 'jsonwebtoken';

import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

class SessionController {
  async store(request, response) {
    const { email, password } = request.body;
    const user = await User.findOne({
      where: { email },
      include: [
        { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
      ],
    });
    if (!user) {
      return response.status(400).json({ message: 'User does not exists.' });
    }
    if (!(await user.checkPassword(password))) {
      return response.status(403).json({ message: 'Authentication failed' });
    }
    const { id, name, avatar } = user;
    return response.json({
      user: { id, name, email, avatar },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
