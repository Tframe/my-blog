/*
*   Author: Trevor Frame
*   Date: 03/26/2021
*   Description: User login and register validators
*/

//validator for register
module.exports.validateRegisterInput = (
    username,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
) => {
    const errors = {};
    //Checks if username empty
    if (username.trim() === '') {
        errors.username = 'Username must not be empty';
    }
    //Checks if first name empty
    if (firstName.trim() === '') {
        errors.firstName = 'First name must not be empty';
    }
    //Checks if last name empty
    if (lastName.trim() === '') {
        errors.lastName = 'Last name must not be empty';
    }
    //Checks if email empty
    if (email.trim() === '') {
        errors.email = 'Email must not be empty';
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email address';
        }
    }
    //Checks if password empty
    if (password === '') {
        errors.password = 'Password must not be empty'
    }
    else if (confirmPassword === '') {
        errors.confirmPassword = 'Confirm password must not be empty';
    }
    else if (password != confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

//Validator for login
module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    //Checks if username empty
    if (username.trim() === '') {
        errors.username = 'Username must not be empty';
    }
    //Checks if username empty
    if (password === '') {
        errors.password = 'Password must not be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

//Use to validate Contact Us information is valid
module.exports.validateContactUs = (name, email, subject, body) => {
    const errors = {};
    //Checks if name empty
    if (name === '') {
        errors.name = 'Name must not be empty';
    }
    //Checks if email empty
    if (email.trim() === '') {
        errors.email = 'Email must not be empty';
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email address';
        }
    }
    //Checks if name empty
    if (subject === '') {
        errors.subject = 'Subject must not be empty';
    }
    //Checks if name empty
    if (body === '') {
        errors.body = 'Body must not be empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

//Use to validate Contact Us information is valid
module.exports.validateCreateArticle = (title, description, body, coverImageUrl, topic) => {
    const errors = {};

    const topics = ['Explore', 'Build', 'Parent', 'Eat and Drink', 'Play'];
    //Checks if title empty
    if (title === '') {
        errors.title = 'Title must not be empty';
    }
    //Checks if body empty
    if (body === '') {
        errors.body = 'Body must not be empty';
    }
    //Checks if description empty
    if (description === '') {
        errors.description = 'Description must not be empty';
    }
    //Checks if coverImageUrl empty
    if (coverImageUrl === '') {
        errors.coverImageUrl = 'Add a valid image';
    }
    //Validate topic is correct type
    if(topic === ''){
        errors.topic = 'Provide a topic';
    }
    if(!topics.includes(topic)){
        console.log(topic);
        errors.topic = 'Provide a valid topic';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

//Use to validate Contact Us information is valid
module.exports.validateCreateComment = (name, email, body) => {
    const errors = {};
    //Checks if name empty
    if (name === '') {
        errors.name = 'Name must not be empty';
    }
    //Checks if email is not empty, if not empty, check it is valid input
    if (email.trim() !== '') {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email address';
        }
    }
    //Checks if desceription empty
    if (body === '') {
        errors.name = 'Comment must not be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}