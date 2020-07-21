import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestValidator from '../../middleware/requestValidator';
import { loginUser } from '../../services/user';
import { Unauthorized } from '../../helpers/error/httpResponseErrors';

export const loginUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const login: RequestHandler = async (req, res, next) => {
  const {
    email, password
  } = req.body;
  try {
    const token = await loginUser(email, password);
    res.locals.responseData = { token };
    next();
  } catch (error) {
    next(Unauthorized(req.__(error.message)));
  }
};

export default requestValidator(login, { validation: { body: loginUserSchema } });
