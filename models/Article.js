/*
*   Author: Trevor Frame
*   Date: 03/25/2021
*   Description: Article model for mongodb 
*/

const { model, Schema } = require('mongoose');

const articleSchema = new Schema({
    author: String,
    username: String,
    description: String,
    title: String,
    coverImageUrl: String,
    body: String,
    createdAt: String,
    comments: [
        {
            body: String,
            email: String,
            name: String,
            createdAt: String,
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String,
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Article', articleSchema);