import { RequestHandler } from 'express';
import requestValidator from '../../middleware/requestValidator';
import { getAllBooks } from '../../services/book';


const all: RequestHandler = async (req, res, next) => {
  const books = await getAllBooks();
  res.locals.responseData = { books };
  next();
};

export default requestValidator(all);
