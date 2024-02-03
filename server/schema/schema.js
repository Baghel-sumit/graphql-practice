const graphql = require('graphql');
const books = require('../Data/books.json');
const _ = require('lodash');

const BookType = new graphql.GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: graphql.GraphQLString },
    title: { type: graphql.GraphQLString },
    categories: { type: graphql.GraphQLString },
  })
});

const RootQuery = new graphql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: (parent, args) => {
        // code to get data from db/other source
        return _.find(books, { id: args.id });
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