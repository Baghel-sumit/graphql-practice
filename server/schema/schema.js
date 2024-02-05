const graphql = require('graphql');
const Books = require('../models/books');
const Authors = require('../models/author');
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

        return Authors.findById(parent.authorId);
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
        return Books.find({ authorId: parent.id });
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
        return Books.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: graphql.GraphQLID }
      },
      resolve: (parent, args) => {
        return Authors.findById(args.id);
      }
    },
    books: {
      type: new graphql.GraphQLList(BookType),
      resolve: () => {
        return Books.find();
      }
    },
    authors: {
      type: new graphql.GraphQLList(AuthorType),
      resolve: () => {
        return Authors.find();
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

const Mutations = new graphql.GraphQLObjectType({
  name: 'Mutations',
  fields: {
    addAuthor : {
      type: AuthorType,
      args: {
        name: { type: graphql.GraphQLString },
        age: { type: graphql.GraphQLString },
      },
      resolve: async (parent, args) => {
        let author = new Authors({
          name: args.name,
          age: args.age
        });
        await author.save();
        return author;
      }
    },
    addBook : {
      type: BookType,
      args: {
        title: { type: graphql.GraphQLString },
        categories: { type: graphql.GraphQLString },
        authorId: { type: graphql.GraphQLID }
      },
      resolve: async (parent, args) => {
        let book = new Books({
          title: args.title,
          categories: args.categories,
          authorId: args.authorId
        });
        await book.save();
        return book;
      }
    }
  }
})

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
})