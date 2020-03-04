import { Op } from 'sequelize';
import { startOfDay, endOfDay } from 'date-fns';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';

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

  async store(request, response) {
    const { id } = request.params;
    const { type, order_id, signature_id } = request.headers;
    if (!type) {
      return response.status(422).json({
        message: 'Field type required.',
        allowedValues: 'start_date, end_date',
      });
    }
    if (type === 'end_date' && !signature_id) {
      return response
        .status(422)
        .json({ message: 'Field signature_id required' });
    }
    const deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return response.status(400).json({ message: 'Deliveryman not found!' });
    }
    const { count } = await Order.findAndCountAll({
      where: {
        deliveryman_id: id,
        start_date: {
          [Op.gte]: startOfDay(new Date()),
          [Op.lte]: endOfDay(new Date()),
        },
      },
    });
    if (count >= 5) {
      return response
        .status(401)
        .json({ message: 'Only five withdrawals a day are allowed.' });
    }
    const order = await Order.findByPk(order_id);
    if (type === 'start_date' && order.start_date === null) {
      order.start_date = new Date();
      await order.save();
    }
    if (
      type === 'end_date' &&
      order.end_date === null &&
      order.start_date !== null
    ) {
      order.end_date = new Date();
      order.signature_id = signature_id;
      await order.save();
    }
    return response.json(order);
  }
}

export default new DeliveryController();
