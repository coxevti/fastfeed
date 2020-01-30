import * as Yup from 'yup';

export default async (resquest, response, next) => {
  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
    oldPassword: Yup.string()
      .min(8)
      .when('password', (password, field) =>
        password ? field.required() : field
      ),
    password: Yup.string().min(8),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password ? field.required().oneOf([Yup.ref('password')]) : field
    ),
  });
  try {
    await schema.validate(resquest.body, { abortEarly: false });
    return next();
  } catch (error) {
    return response
      .status(422)
      .json({ fields: error.errors, messages: 'Validation fails' });
  }
};
