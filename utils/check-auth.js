/*
*   Author: Trevor Frame
*   Date: 03/26/2021
*   Description: Helper functions for checking user is authorized
*/
const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/config');

module.exports = (context) => {

    const authHeader = context.req.headers.authorization;
    //Check there is an auth header in context
    if(authHeader){
        const token = authHeader.split('Bearer ')[1];
        //Check there is a token in authheader
        if(token){
            try {
                //Check the token is valid
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            } catch(error) {
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]');
    }
    throw new Error('Authorization header must be provided');
}