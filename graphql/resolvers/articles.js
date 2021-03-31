/*
*   Author: Trevor Frame
*   Date: 03/26/2021
*   Description: Maintain graphql article resolvers
*/
const { AuthenticationError } = require('apollo-server');

const Article = require('../../models/Article');
const checkAuth = require('../../utils/check-auth');
const User = require('../../models/User');

//Required resolvers for graphql
module.exports = {
    Query: {
        //get all articles
        async getArticles() {
            try {
                const articles = await Article.find().sort({ createdAt: -1 });
                return articles;
            } catch (error) {
                throw new Error(error);
            }
        },
        //get a single article by id
        async getArticle(_, { articleId }){
            try {
                const article = await Article.findById(articleId);
                if(article){
                    return article;
                } else {
                    throw new Error('Article does not exist')
                }
            } catch (error) {
                throw new Error(error);
            }
        }
    },

    Mutation: {
        //Create an article
        async createArticle(_, { body, title }, context){
            //check authorized
            const user = checkAuth(context);
            
            const userInfo = await User.findById(user.id);

            const newArticle = new Article({
                title,
                username: userInfo.username,
                body,
                author: userInfo.firstName + ' ' + userInfo.lastName,
                createdAt: new Date().toISOString(),
            });
            const article = await newArticle.save();

            //send subscribers alert of new article
            context.pubsub.publish('NEW_ARTICLE', {
                newArticle: article,
            })

            return article;
        },
        //delete an article
        async deleteArticle(_, { articleId }, context){
            //check authorization
            const user = checkAuth(context);
            try {
                const article = await Article.findById(articleId);
                if(user.username === article.username){
                    await article.delete();
                    return 'Article deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (error) {
                throw new Error(error);
            }
        },
    },
}