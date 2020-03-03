import { Op } from 'sequelize';
import Order from '../models/Order';

class DeliveryController {
  async index(request, response) {
    const { id } = request.params;
    const { search } = request.headers;
    let orders = [];
    if (search === 'closed_deliveries') {
      orders = await Order.findAll({
        where: {
          deliveryman_id: id,
          end_date: {
            [Op.not]: null,
          },
          canceled_at: {
            [Op.is]: null,
          },
        },
      });
    } else {
      orders = await Order.findAll({
        where: {
          deliveryman_id: id,
          end_date: {
            [Op.is]: null,
          },
          canceled_at: {
            [Op.is]: null,
          },
        },
      });
    }
    return response.json(orders);
  }
}

export default new DeliveryController();
