/*
*   Author: Trevor Frame
*   Date: 03/28/2021
*   Description: Contact Us model for mongodb 
*/

const { model, Schema } = require('mongoose');

const contactUsSchema = new Schema ({
    name: String,
    email: String,
    subject: String,
    body: String,
    createdAt: String,
});

module.exports = model('ContactUs', contactUsSchema);