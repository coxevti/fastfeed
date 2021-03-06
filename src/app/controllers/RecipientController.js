import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(request, response) {
    const { q } = request.query;
    const query = q ? { where: { name: { [Op.iLike]: `%${q}%` } } } : {};
    const recipent = await Recipient.findAll(query);
    return response.json(recipent);
  }

  async store(request, response) {
    const { name, street, number, complement, state, city, cep } = request.body;
    const [recipient] = await Recipient.findOrCreate({
      where: { name },
      defaults: { name, street, number, complement, state, city, cep },
    });
    return response.json(recipient);
  }

  async update(request, response) {
    const { id } = request.params;
    const recipient = await Recipient.findByPk(id);
    if (!recipient) {
      return response.status(400).json({ message: 'Recipient not found!' });
    }
    const recipientUp = await recipient.update(request.body);
    return response.json(recipientUp);
  }
}

export default new RecipientController();
