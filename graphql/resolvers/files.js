/*
*   Author: Trevor Frame
*   Date: 04/18/2021
*   Description: Maintain graphql file resolvers
*/

const { Storage } = require('@google-cloud/storage');
const path = require('path');
const fs = require('fs');

//google cloud storage
const gc = new Storage({
    keyFilename: path.join(__dirname, '../../config/frame-family-blog-f543a78ccbf2.json'),
    projectId: 'frame-family-blog',
});

const frameFamilyBucket = gc.bucket('frame-family-bucket');

//Function used to create a random string for file name
function generateRandomString(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

const processUpload = async (file) => {

    const { createReadStream, mimetype, encoding, filename } = await file;
    // //get file extension
    const { ext } = path.parse(filename);
    // //generate random string and add file extension
    const randomName = generateRandomString(12) + ext;
    const pathName = path.join(__dirname, `../../public/images/${randomName}`);
    let stream = createReadStream();
    return await new Promise((resolve, reject) => {
        stream.pipe(
            frameFamilyBucket.file(randomName).createWriteStream({
                resumable: false,
                gzip: true,
            })
        )
            .on('finish', () => {
                
                resolve({
                    success: true,
                    message: "Successfully Uploaded",
                    mimetype, filename, encoding, location: pathName,
                    url: `https://storage.cloud.google.com/frame-family-bucket/${randomName}`,
                })
            })
            .on("error", (error) => {
                console.log("Error Event Emitted")
                reject({
                    success: false,
                    message: "Failed"
                })
            })
    });

}

//Required resolvers for graphql
module.exports = {
    Query: {

    },

    Mutation: {
        uploadImage: async (_, { file }) => {

            return processUpload(file);

        },
    }
}