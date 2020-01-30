import * as Yup from 'yup';

export default async (request, response, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(8)
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
