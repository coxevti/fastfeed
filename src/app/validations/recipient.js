import * as Yup from 'yup';

const store = async (request, response, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    street: Yup.string().required(),
    number: Yup.string().required(),
    complement: Yup.string(),
    state: Yup.string()
      .max(2)
      .required(),
    city: Yup.string().required(),
    cep: Yup.string()
      .max(10)
      .required(),
  });
  try {
    await schema.validate(request.body, { abortEarly: false });
    return next();
  } catch (error) {
    return response
      .status(422)
      .json({ fields: error.errors, message: 'Validation fails' });
  }
};

const update = async (request, response, next) => {
  const schema = Yup.object().shape({
    name: Yup.string(),
    street: Yup.string(),
    number: Yup.string(),
    complement: Yup.string(),
    state: Yup.string().max(2),
    city: Yup.string(),
    cep: Yup.string().max(10),
  });
  try {
    await schema.validate(request.body, { abortEarly: false });
    return next();
  } catch (error) {
    return response
      .status(422)
      .json({ fields: error.errors, message: 'Validations fails' });
  }
};

export default { store, update };
