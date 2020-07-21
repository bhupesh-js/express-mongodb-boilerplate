import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestValidator from '../../middleware/requestValidator';
import { addBook } from '../../services/book';

export const addBookSchema = Joi.object().keys({
  name: Joi.string().required(),
  author: Joi.string().required()
});

/**
 * Add a book into the database if the data is valid
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const add: RequestHandler = async (req, res, next) => {
  const { name, author } = req.body;
  const addedBook = await addBook(name, author);
  res.locals.responseData = { book: addedBook.toJSON() };
  next();
};

export default requestValidator(add, { validation: { body: addBookSchema } });
