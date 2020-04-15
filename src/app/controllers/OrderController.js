import { Op } from 'sequelize';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';

import OrderDetailsMail from '../jobs/orderDetailsMail';
import Queue from '../../lib/Queue';
import EscapeRegex from '../../helpers/EscapeRegex';

class OrderController {
  async index(request, response) {
    const { q, page = 1, perPage = 10 } = request.query;
    const offset = perPage * (Number(page) - 1);
    const from = (Number(page) - 1) * perPage + 1;
    const to = page * perPage;
    let query = { limit: perPage, offset };
    if (q) {
      const regex = EscapeRegex(q);
      query = {
        where: { product: { [Op.iLike]: `%${regex}%` } },
        limit: perPage,
        offset,
      };
    }
    const { count, rows } = await Order.findAndCountAll(query);
    return response.json({
      orders: rows,
      currentPage: Number(page),
      pages: Math.ceil(count / perPage),
      searchValue: q,
      numOfResults: count,
      from,
      to,
    });
  }

  async store(request, response) {
    const { recipient_id, deliveryman_id, product } = request.body;
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    const order = await Order.create({ recipient_id, deliveryman_id, product });
    await Queue.add(OrderDetailsMail.key, { deliveryman, product });
    return response.status(201).json(order);
  }

  async update(request, response) {
    const { recipient_id, deliveryman_id, product } = request.body;
    const { id } = request.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return response.status(400).json({ message: 'Order not found!' });
    }
    const updated = await order.update({
      recipient_id,
      deliveryman_id,
      product,
    });
    return response.json(updated);
  }

  async destroy(request, response) {
    const { id } = request.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return response.status(400).json({ message: 'Order not found!' });
    }
    await order.destroy();
    return response.status(204).json();
  }
}

export default new OrderController();
