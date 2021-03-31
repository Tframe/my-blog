/*
*   Author: Trevor Frame
*   Date: 03/25/2021
*   Description: User model for mongodb 
*/

const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    createdAt: String,
});

module.exports = model('User', userSchema);