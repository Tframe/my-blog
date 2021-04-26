/*
*   Author: Trevor Frame
*   Date: 03/26/2021
*   Description: Maintain graphql typeDefs
*/

const { gql } = require('apollo-server');

//Create the type defs for graph ql
module.exports = gql`

    type File {
        url: String!,
        success: Boolean!,
        message: String!,
        mimetype: String,
        encoding: String,
        filename: String,
        location: String,
    },

    type Comment {
        id: ID!,
        body: String!,
        createdAt: String!,
        name: String!,
        email: String,
    },

    type Likes {
        id: ID!,
        createdAt: String!,
        username: String!,
    },

    type Article {
        id: ID!,
        title: String!,
        body: String!,
        description: String!,
        author: String!,
        username: String!,
        createdAt: String!,
        comments: [Comment]!,
        commentCount: Int!,
        likes: [Likes]!,
        likeCount: Int!
        coverImageUrl: String,
    },

    type ContactUs {
        id: ID!,
        name: String!,
        email: String!,
        subject: String!,
        body: String!,
        createdAt: String!,
    },

    type User {
        id: ID!,
        email: String!,
        firstName: String!,
        lastName: String!,
        token: String!,
        username: String,
        createdAt: String!,
    },

    input RegisterInput {
        username: String!,
        firstName: String!,
        lastName: String!,
        password: String!,
        confirmPassword: String!,
        email: String!,
    },

    input ContactUsInput {
        name: String!,
        email: String!,
        subject: String!,
        body: String!,
    },

    type Query {

        getComments: [Comment],
        getComment(commentId: ID!): Comment,

        getArticles: [Article],
        getArticle(articleId: ID!): Article,
    },

    type Mutation {
        register(registerInput: RegisterInput): User!,
        login(username: String!, password: String!): User!,

        createComment(articleId: ID!, name: String!, email: String!, body: String!): Article!,
        deleteComment(articleId: ID!, commentId: ID!): Article!,

        likeArticle(articleId: ID!): Article!,

        createArticle(title: String!, body: String!, description: String!, coverImageUrl: String): Article!,
        deleteArticle(articleId: ID!): String!,

        createContact(contactUsInfo: ContactUsInput): ContactUs!,

        uploadImage(file: Upload!): File!,
    },
`;