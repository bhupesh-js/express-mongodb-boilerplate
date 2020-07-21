import { RequestHandler } from 'express';
import requestValidator from '../../middleware/requestValidator';
import { searchBook } from '../../services/book';

const get: RequestHandler = async (req, res, next) => {
  const { name = undefined, author = undefined } = req.query;
  const books = await searchBook((name as string), (author as string));
  res.locals.responseData = { books };
  next();
};

export default requestValidator(get);
