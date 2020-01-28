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
}

export default new UserController();
