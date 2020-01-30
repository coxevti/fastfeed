import * as Yup from 'yup';

export default async (request, response, next) => {
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
