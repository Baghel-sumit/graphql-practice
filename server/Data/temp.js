const authors = require('./authors.json');
const books = require('./books.json');
const AuthorsModel = require('../models/author');
const BooksModel = require('../models/books');

// const promises = books.map(async (book)=> {
//   const author = await AuthorsModel.find({ name: book.author });
//   if (author[0].id) {
//     await (new BooksModel({ title: book.title, categories: book.categories, author: book.author, authorId: author[0].id })).save();
//   }
// });
// const promises = authors.map(async (author)=> {
//   const authorData = await AuthorsModel.find({ name: author.name });
//   if (!authorData.length) {
//     await (new AuthorsModel({ name: author.name, age: author.age })).save();
//   }
// });

// const main = async () => {
//   await Promise.all(promises);
// }

// main();