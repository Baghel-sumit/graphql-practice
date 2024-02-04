const graphql = require('graphql');
const books = require('../Data/books.json');
const authors = require('../Data/authors.json');
const _ = require('lodash');

const BookType = new graphql.GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: graphql.GraphQLID },
    title: { type: graphql.GraphQLString },
    categories: { type: graphql.GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, args) => {

        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new graphql.GraphQLObjectType({
  name: "AuthorType",
  fields: () => ({
    id: { type: graphql.GraphQLID },
    name: { type: graphql.GraphQLString },
    age: { type: graphql.GraphQLString },
    books: {
      type: new graphql.GraphQLList(BookType),
      resolve: (parent, args) => {
        return _.filter(books, { authorId: parent.id })
      }
    }
  })
})

const RootQuery = new graphql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: graphql.GraphQLID }
      },
      resolve: (parent, args) => {
        // code to get data from db/other source
        console.log({ parent, args });
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: graphql.GraphQLID }
      },
      resolve: (parent, args) => {

        return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: new graphql.GraphQLList(BookType),
      resolve: () => {
        return books;
      }
    },
    authors: {
      type: new graphql.GraphQLList(AuthorType),
      resolve: () => {
        return authors;
      }
    }
  }
});

/*
  on above query

 book(id: '1455654') {
  name
  genre
 }
*/

module.exports = new graphql.GraphQLSchema({
  query: RootQuery
})