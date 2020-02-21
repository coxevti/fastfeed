import Mail from '../../lib/Mail';

class OrderDetailsMail {
  get key() {
    return 'OrderDetailsMail';
  }

  async handle({ data }) {
    const { deliveryman, product } = data;
    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Produto dísponível para a retirada',
      template: 'orderDetails',
      context: {
        deliveryman: deliveryman.name,
        product,
      },
    });
  }
}

export default new OrderDetailsMail();
