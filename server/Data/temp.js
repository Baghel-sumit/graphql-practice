const authors = require('./authors.json');
const books = require('./books.json');
const fs = require('fs');

const modifiedBooks = books.map((item)=> {
  const authorDetails = authors.find((auth)=> auth.name === item.author);
  if (authorDetails) {
    item.authorId = authorDetails.id;
  }
  return item;
});

fs.writeFileSync('books.json', JSON.stringify(modifiedBooks));