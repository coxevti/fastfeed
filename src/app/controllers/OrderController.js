import Order from '../models/Order';

class OrderController {
  async index(request, response) {
    const orders = await Order.findAll();
    return response.json(orders);
  }

  async store(request, response) {
    const { recipient_id, deliveryman_id, product } = request.body;
    const order = await Order.create({ recipient_id, deliveryman_id, product });
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
