const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const expressPlayground = require('graphql-playground-middleware-express').default;
const graphQLSchema = require('./schema/schema');

const app = express();
app.use('/graphql', createHandler({
  schema: graphQLSchema,
}));
app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

app.listen(5000, () => {
  console.log('Server is listening on port: 5000');
});
