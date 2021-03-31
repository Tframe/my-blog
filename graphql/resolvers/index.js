/*
*   Author: Trevor Frame
*   Date: 03/26/2021
*   Description: Maintain graphql resolvers
*/

const commentResolvers = require('./comments');
const articleResolvers = require('./articles');
const usersResolvers = require('./users');
const contactUsResolvers = require('./contact-us');

module.exports = {

    Article: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length,
    },

    Query: {
        ...commentResolvers.Query,
        ...articleResolvers.Query,
    },

    Mutation: {
        ...usersResolvers.Mutation,
        ...commentResolvers.Mutation,
        ...articleResolvers.Mutation,
        ...contactUsResolvers.Mutation,
    },
}