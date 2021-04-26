/*
*   Author: Trevor Frame
*   Date: 03/25/2021
*   Description: Create server for connecting 
*   to mongodb atlas.
*/

const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const { ATLAS_URI } = require('./config');
//get graphql typedefs and resolvers
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express();

//Create apollo server with the typedefs and resolvers
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
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

        server.applyMiddleware({ app });
        //Use public dir as static dir for public use
        app.use(express.static(path.join(__dirname + '/public')));

        app.use('/images', express.static(path.join(__dirname + '/public/images')));

        app.use(cors());

        app.listen({ port: port }, () => {
            console.log(`Server running...`);
        });
    } catch (error) {
    console.log(error);
}
}).catch ((error) => {
    console.log(error);
});



