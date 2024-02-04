const graphql = require('graphql');
const books = require('../Data/books.json');
const _ = require('lodash');

const BookType = new graphql.GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: graphql.GraphQLID },
    title: { type: graphql.GraphQLString },
    categories: { type: graphql.GraphQLString },
  })
});

const AuthorType = new graphql.GraphQLObjectType({
  name: "AuthorType",
  fields: () => ({
    id: { type: graphql.GraphQLID },
    name: { type: graphql.GraphQLString },
    age: { type: graphql.GraphQLString }
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
        name: { type: graphql.GraphQLString }
      },
      resolve: (parent, args) => {

        return _.find(books, { author: args.name });
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