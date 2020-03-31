import * as Yup from 'yup';

const index = async (request, response, next) => {
  const schema = Yup.object().shape({
    q: Yup.string(),
    page: Yup.string().matches(
      /^(0|[1-9]\d*)$/,
      'Only whole number [0,1...99999]'
    ),
  });
  try {
    await schema.validate(request.query, { abortEarly: false });
    return next();
  } catch (error) {
    return response
      .status(422)
      .json({ fields: error.errors, message: 'Validation Fails' });
  }
};

const store = async (request, response, next) => {
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

export default { store, index };
