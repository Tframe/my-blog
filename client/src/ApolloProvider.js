/*
*   Author: Trevor Frame
*   Date: 03/31/2021
*   Description: Apollo provider to connect to backend server.
*   and wraps entire application with it.
*/

import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';

//Link to http server requests
const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
});

//Creates a header object for requests
const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    //Provide token header if token is available
    return{
        headers: {
            Authorization: token ?  `Bearer ${token}` : ''
        }
    }
});

//Create the apollo client connection
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});


export default (
    <ApolloProvider client = {client}>
        <App/>
    </ApolloProvider>
)
