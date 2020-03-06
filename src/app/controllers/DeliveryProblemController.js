import DeliveryProblem from '../models/DeliveryProblem';
import Deliveryman from '../models/Deliveryman';
import Order from '../models/Order';

import CancelDeliveryMail from '../jobs/cancelDeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
  async index(request, response) {
    const deliveryProblem = await DeliveryProblem.findAll();
    return response.json(deliveryProblem);
  }

  async store(request, response) {
    const { id } = request.params;
    const { description } = request.body;
    const deliveryProblem = await DeliveryProblem.create({
      delivery_id: id,
      description,
    });
    return response.json(deliveryProblem);
  }

  async destroy(request, response) {
    const { id } = request.params;
    const { deliveryman_id } = request.headers;
    if (!deliveryman_id) {
      return response
        .status(422)
        .json({ message: 'Field deliveryman_id required' });
    }
    const deliveryProblem = await DeliveryProblem.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Order,
          as: 'order',
          attributes: ['id', 'product'],
        },
      ],
    });
    if (!deliveryProblem) {
      return response
        .status(400)
        .json({ message: 'Delivery problem not found!' });
    }
    await deliveryProblem.destroy();
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    const { product } = deliveryProblem.order;
    await Queue.add(CancelDeliveryMail.key, { deliveryman, product });
    return response.status(204).json();
  }
}

export default new DeliveryProblemController();
