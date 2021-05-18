/*
*   Author: Trevor Frame
*   Date: 03/28/2021
*   Description: Maintain graphql contact us resolvers
*/

const mailer = require('nodemailer');

const ContactUs = require('../../models/Contact-Us');
const checkAuth = require('../../utils/check-auth');
const { validateContactUs } = require('../../utils/validators');

//Used for oatuh2 emailer
const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = require('../../config/config');

//Function to take contact us info and send to email
//Based on w3schools nodejs email example
function emailContactInformation(newContactUs) {
    var transporter = mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'tframe67@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
        }
    });

    //options for sent info
    var mailOptions = {
        from: newContactUs.name + ' <' + newContactUs.email + '>',
        to: 'tframe67@gmail.com',
        subject: newContactUs.subject,
        text: newContactUs.body,
    }

    transporter.sendMail(mailOptions, function(error, info){
       if(error) {
           console.log(error);
       } else {
           console.log('Email sent: ' + info.response);
       }
    });

}


module.exports = {
    Mutation: {
        //Create a contact
        async createContact(
            _,
            {
                contactUsInfo: { name, email, subject, body }
            },
            context,
            info
        ) {
            //validate contact us info
            const { valid, errors } = validateContactUs(
                name,
                email,
                subject,
                body,
            );
            //If information is not valid, display errors
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            //Otherwise, create the contact information
            const newContactUs = new ContactUs({
                name: name,
                email: email,
                subject: subject,
                body: body,
                createdAt: new Date().toISOString(),
            });
            const contact = await newContactUs.save();

            emailContactInformation(newContactUs);

            return contact;
        },
    }
}