/*
*   Author: Trevor Frame
*   Date: 03/26/2021
*   Description: Maintain graphql comment resolvers
*/
const { AuthenticationError, UserInputError } = require('apollo-server');
const Article = require('../../models/Article');

const Comment = require('../../models/Comment');
const checkAuth = require('../../utils/check-auth');
const { validateCreateComment } = require('../../utils/validators');

//Required resolvers for graphql
module.exports = {
    Query: {
        //Get all comments
        async getComments() {
            try {
                const comments = await Comment.find().sort({ createAt: -1 });
                return comments;
            } catch (error) {
                throw new Error(error);
            }
        },
        //Get a single comment by id
        async getComment(_, { commentId }) {
            try {
                const comment = await Comment.findById(commentId);
                if (comment) {
                    return comment;
                } else {
                    throw new Error('Comment not found');
                }
            } catch (error) {
                throw new Error(error);
            };
        },
    },

    Mutation: {
        //Create a comment
        async createComment(_, { articleId, name, email, body }, context){
            //Validate user data
            const { valid, errors } = validateCreateComment(
                name,
                email,
                body,
            );
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            //find article by id
            const article = await Article.findById(articleId);
            if(article){
                article.comments.unshift({
                    body,
                    name,
                    email,
                    createdAt: new Date().toISOString(),
                });
                await article.save();
                return article;
            } else {
                throw new UserInputError('Article not found');
            }
        },
        //delete a comment
        async deleteComment(_, { articleId, commentId }, context){
            //Check authorization before creating the comment
            const { username } = checkAuth(context);
            //Find the article
            const article = await Article.findById(articleId);
            
            if(article){
                //Find the comment id
                const commentIndex = article.comments.findIndex(comment => comment.id === commentId);
                //Verify user that wrote comment is trying to delete.
                if(article.comments[commentIndex].username === username){
                    article.comments.splice(commentIndex, 1);
                    await article.save();
                    return article;
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            }
        },
        
    }
}