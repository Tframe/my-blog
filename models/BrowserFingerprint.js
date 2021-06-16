/*
*   Author: Trevor Frame
*   Date: 05/30/2021
*   Description: Browser Fingerprint model for mongodb 
*/

const { model, Schema } = require('mongoose');

const browserFingerprintSchema = new Schema({
    browserFingerprintId: String,
    createdAt: String,
});

module.exports = model('BrowserFingerprint', browserFingerprintSchema);