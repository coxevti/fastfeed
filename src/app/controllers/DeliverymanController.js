import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(request, response) {
    const deliverers = await Deliveryman.findAll();
    return response.json(deliverers);
  }

  async store(request, response) {
    const { avatar_id, name, email } = request.body;
    const deliveryman = await Deliveryman.findOne({
      where: {
        email,
      },
    });
    if (deliveryman) {
      return response
        .status(400)
        .json({ message: 'Already registered develiveryman' });
    }
    const { id } = await Deliveryman.create({ avatar_id, name, email });
    return response.status(201).json({ id, avatar_id, name, email });
  }

  async update(request, response) {
    const { name, avatar_id } = request.body;
    const { id } = request.params;
    const deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return response.status(400).json({ message: 'Deliveryman not found!' });
    }
    const updated = await deliveryman.update({ name, avatar_id });
    return response.json(updated);
  }

  async destroy(request, response) {
    const { id } = request.params;
    const deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return response.status(400).json({ message: 'Deliveryman not found!' });
    }
    await deliveryman.destroy();
    return response.status(204).json();
  }
}

export default new DeliverymanController();
