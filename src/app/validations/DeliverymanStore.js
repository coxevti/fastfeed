import * as Yup from 'yup';

export default async (request, response, next) => {
  const schema = Yup.object().shape({
    avatar_id: Yup.number().required(),
    name: Yup.string().required(),
    email: Yup.string()
      .email()
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
