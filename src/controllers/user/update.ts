import { RequestHandler, Request } from 'express';
import Joi from '@hapi/joi';
import requestValidator from '../../middleware/requestValidator';
import { updateUser } from '../../services/user';
import { Unauthorized } from '../../helpers/error/httpResponseErrors';
import { IRequest } from '../../common/types';

export const updateUserSchema = Joi.object().keys({
  email: Joi.string().email(),
  password: Joi.string(),
  name: Joi.string().min(5),
  imageUri: Joi.string().uri(),
  status: Joi.string()
});


const update: RequestHandler = async (req:IRequest, res, next) => {
  const {
    name, email, password, imageUri, status
  } = req.body;
  try {
    const updatedUser = await updateUser(req.userId, email, password, name, imageUri, status);
    res.locals.responseData = { userId: updatedUser._id };
    next();
  } catch (error) {
    next(Unauthorized(req.__(error.message)));
  }
};

export default requestValidator(update, { validation: { body: updateUserSchema } });
