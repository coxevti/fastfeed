import User from '../models/User';

class UserController {
  async store(request, response) {
    const { name, email, password } = request.body;
    const userExist = await User.findOne({
      where: { email },
    });
    if (userExist) {
      return response.json({ message: 'User already exists' });
    }
    const { id } = await User.create({ name, email, password });
    return response.json({ id, name, email });
  }

  async update(request, response) {
    const { email, oldPassword } = request.body;
    const user = await User.findByPk(request.userId);
    if (email && email !== user.email) {
      const emailExist = await User.findOne({ where: { email } });
      if (emailExist) {
        return response.status(400).json({ message: 'User already exists' });
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return response.status(401).json({ message: 'Invalid password' });
    }
    const { id, name } = await user.update(request.body);
    return response.json({ id, name, email });
  }
}

export default new UserController();
