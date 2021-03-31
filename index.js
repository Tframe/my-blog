/*
*   Author: Trevor Frame
*   Date: 03/25/2021
*   Description: Create server for connecting 
*   to mongodb atlas.
*/

const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const { ATLAS_URI } = require('./config');
//get graphql typedefs and resolvers
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();

//Create apollo server with the typedefs and resolvers
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub }),
});


mongoose.connect(ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
//Once connection to mongodb atlas is established, setup a server to listen
connection.once('open', () => {
    console.log("mongoDB database connection established successfully");
}).then(async () => {
    //Create express server with port number
    const port = process.env.PORT || 5000;

    try {
        const res = await server.listen({ port: port });
        console.log(`Server running at ${res.url}`);
    } catch (error) {
        console.log(error);
    }
}).catch((error) => {
    console.log(error);
});



