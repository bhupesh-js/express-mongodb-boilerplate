import Book from '../models/Book';

/**
 * Add a book to the database
 *
 * @param {string} name
 * @param {string} author
 * @returns newly added book data
 */
const addBook = async (name:string, author: string) => {
  const book = new Book({ name, author });
  const addedBook = await book.save();
  return addedBook;
};


/**
 * Get all the books from the database
 *
 * @returns all the books which are stored in the database
 */
const getAllBooks = async () => {
  const books = await Book.find();
  return books;
};

/**
 * Builds a mongoose query object to search books according to book name and author name.
 * @param name String containing the book name or part of the book's name
 * @param author String containing the author name or part of the author's name
 */
const buildBookSeachQuery = (name: string, author: string) => {
  const query: any = {};
  if (name) {
    query.name = new RegExp(`.*${name}.*`, 'i');
  }
  if (author) {
    query.author = new RegExp(`.*${author}.*`, 'i');
  }

  return query;
};

/**
 * Search books based on search text
 *
 * @param {string} name
 * @param {string} author
 * @returns list of books matched name or author as search text
 */
const searchBook = async (name: string, author:string) => {
  const query = buildBookSeachQuery((name as string), (author as string));
  const books = await Book.find(query);
  return books;
};

export { addBook, getAllBooks, searchBook };
