import * as Yup from 'yup';

export default async (request, response, next) => {
  const schema = Yup.object().shape({
    file: Yup.mixed().required(),
  });
  try {
    await schema.validate(request);
    return next();
  } catch (error) {
    return response
      .status(422)
      .json({ field: error.errors, message: 'Validation fails' });
  }
};
