import * as Yup from 'yup';

export default async (request, response, next) => {
  const schema = Yup.object().shape({
    recipient_id: Yup.number().required(),
    deliveryman_id: Yup.number().required(),
    product: Yup.string().required(),
  });
  try {
    await schema.validate(request.body, { abortEarly: false });
    return next();
  } catch (error) {
    return response
      .status(422)
      .json({ fields: error.errors, message: 'Validation Fails' });
  }
};
