/*
*   Author: Trevor Frame
*   Date: 03/26/2021
*   Description: Maintain graphql article resolvers
*/
const { AuthenticationError, UserInputError } = require('apollo-server');

const { validateCreateArticle } = require('../../utils/validators');
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
        //get all articles by a topic
        async getArticlesByTopic(_, { topic }) {

            try {
                var query = { topic: topic }
                //get list of articles with this topic
                const articles = await Article.find(query).sort({ createdAt: -1 });
                return articles;
            } catch (error) {
                throw new Error(error);
            }
        },
        //get a single article by id
        async getArticle(_, { articleId }) {
            try {
                const article = await Article.findById(articleId);
                if (article) {
                    return article;
                } else {
                    throw new Error('Article does not exist')
                }
            } catch (error) {
                throw new Error(error);
            }
        },
    
    },

    Mutation: {
        //Create an article
        async createArticle(_, { body, title, description, coverImageUrl, topic, extraPhotosAndBodies }, context) {

            //check authorized
            const user = checkAuth(context);
            //Find user by id
            const userInfo = await User.findById(user.id);

            //Validate user input
            const { valid, errors } = validateCreateArticle(
                title,
                description,
                body,
                coverImageUrl,
                topic,
                extraPhotosAndBodies,
            );
            //If not valid, show errors
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            //new article object
            const newArticle = new Article({
                title,
                description,
                username: userInfo.username,
                body,
                coverImageUrl,
                topic,
                extraPhotosAndBodies,
                author: userInfo.firstName + ' ' + userInfo.lastName,
                createdAt: new Date().toISOString(),
            });
            //Save article to mongodb
            const article = await newArticle.save();

            return article;
        },
        //delete an article
        async deleteArticle(_, { articleId }, context) {
            //check authorization
            const user = checkAuth(context);
            try {
                const article = await Article.findById(articleId);
                if (user.username === article.username) {
                    await article.delete();
                    return 'Article deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        //Like an article
        async likeArticle(_, { articleId }, context) {
            //Check authorization before creating the comment
            const { username } = checkAuth(context);

            //find article by id
            const article = await Article.findById(articleId);

            if (article) {
                //If article liked already, unlike it, otherwise like it
                if (article.likes.find((like) => like.username === username)) {
                    //Grab each like by all other users. 
                    article.likes = article.likes.filter((like) => like.username !== username);
                } else {
                    //add like info to array
                    article.likes.push({
                        username,
                        createdAt: new Date().toISOString(),
                    });
                }
                //save like
                await article.save();
                return article;
            } else {
                throw new UserInputError('Article not found');
            }
        }
    },
}