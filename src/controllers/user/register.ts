import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestValidator from '../../middleware/requestValidator';
import { registerUser } from '../../services/user';
import { Unauthorized } from '../../helpers/error/httpResponseErrors';

export const registerUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().min(5),
  imageUri: Joi.string().uri(),
  status: Joi.string()
});

const register: RequestHandler = async (req, res, next) => {
  const {
    name, email, password, imageUri, status
  } = req.body;
  try {
    const generatedUser = await registerUser(email, password, name, imageUri, status);
    res.locals.responseData = { userId: generatedUser._id };
    next();
  } catch (error) {
    next(Unauthorized(req.__(error.message)));
  }
};

export default requestValidator(register, { validation: { body: registerUserSchema } });
