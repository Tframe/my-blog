/*
*   Author: Trevor Frame
*   Date: 03/25/2021
*   Description: Comment model for mongodb 
*/

const { model, Schema } = require('mongoose');

const commentSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
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

module.exports = model('Comment', commentSchema);