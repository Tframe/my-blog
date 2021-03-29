/*
*   Author: Trevor Frame
*   Date: 03/26/2021
*   Description: Maintain graphql user resolvers. User bcrypt for hashing
*   passwords and jsonwebtoken for creating tokens
*/

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');
const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

//Takes user information and returns a token
function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    }, SECRET_KEY,
        { expiresIn: '1h' }
    );
}


module.exports = {
    Mutation: {
        async register(_,
            {
                registerInput: { username, firstName, lastName, email, password, confirmPassword }
            },
            context,
            info,
        ) {
            //Validate user data
            const { valid, errors } = validateRegisterInput(
                username,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
            );
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            //Make sure user doesn't already exist
            const userName = await User.findOne({ username });
            const userEmail = await User.findOne({ email });
            //If user exists, return error
            if (userName) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                });
            } else if (userEmail) {
                throw new UserInputError('Email is taken', {
                    errors: {
                        username: 'This email is taken'
                    }
                });
            }

            //hash password and create auth token
            password = await bcrypt.hash(password, 12);

            //Create a User model
            const newUser = new User({
                email,
                username,
                firstName,
                lastName,
                password,
                createdAt: new Date().toISOString(),
            });

            //Save user info to mongodb
            const res = await newUser.save();

            //Create a web token using id, email, and username
            //Expires in 1 hour.
            const token = generateToken(res);

            //Information returned after creating web token
            return {
                ...res._doc,
                id: res._id,
                token,
            }
        },

        async login(_, { username, password }) {
            
            //verify login info are entered
            const { errors, valid } = validateLoginInput(username, password);
            //if validation is bad, throw error
            if(!valid){
                throw new UserInputError('Errors', { errors });
            }
            //check if username correct
            const user = await User.findOne({ username });
            if(!user){
                errors.general = 'Incorrect username or password';
                throw new UserInputError('Incorrect username or password', { errors });
            }
            //Check if password is correct
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general = 'Incorrect username or password';
                throw new UserInputError('Incorrect username or password', { errors });
            }

            //Successful login, issue token
            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token,
            }
        }
    }
}