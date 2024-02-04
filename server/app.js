const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const expressPlayground = require('graphql-playground-middleware-express').default;
const graphQLSchema = require('./schema/schema');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use('/graphql', createHandler({
  schema: graphQLSchema,
}));
app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

// connection with database
const url = process.env.DB_CONNECTION_LINK.replace('<password>', process.env.DB_PASSWORD);
mongoose.connect(url).then(()=> {
  console.log('DB connected successfully!!');
}).catch((err)=> {
  console.log("unable to connect db, error: ", err);
});

app.listen(5000, () => {
  console.log('Server is listening on port: 5000');
});
