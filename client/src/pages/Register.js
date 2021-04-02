/*
*   Author: Trevor Frame
*   Date: 04/01/2021
*   Description: Register page for user to enter
*   user information.
*/

import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function Register(props) {
    //Get access to user context
    const context = useContext(AuthContext);

    //For setting errors to display if any
    const [errors, setErrors] = useState({});

    //Use the useForm hook to change and submit values by passing a 
    //call back function to register a user.
    const { onChange, onSubmit, values } = useForm(registerUser, {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    //Function to call REGISTER_USER mutation to create a user through apollo
    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        //If mutation is successful, trigger and get result back
        //Destructure from result to get the data,
        //then get register from data and give alias userData.
        update(_, { data: { register: userData }}) {
            context.login(userData);
            props.history.push('/');
        },
        //If any errors come back from server side submit, add them to 
        //an array of errors that will then be displayed
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
    });

    //Workaround
    function registerUser() {
        addUser();
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input
                    label='First Name'
                    placeholder='First Name...'
                    name='firstName'
                    type='text'
                    value={values.firstName}
                    error={errors.firstName ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label='Last Name'
                    placeholder='Last Name...'
                    name='lastName'
                    type='text'
                    value={values.lastName}
                    error={errors.lastName ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label='Email'
                    placeholder='Email...'
                    name='email'
                    type='email'
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label='Username'
                    placeholder='Username...'
                    name='username'
                    type='text'
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label='Password'
                    placeholder='Password...'
                    name='password'
                    type='password'
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label='Confirm Password'
                    placeholder='Confirm Password...'
                    name='confirmPassword'
                    type='password'
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                />
                <Button type='submit' primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className='ui error message'>
                    <ul className='list'>
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

//Graphql register user mutation setup
//Using will call the registerInput mutation 
//setup on server side and returns information back
const REGISTER_USER = gql`
    mutation register(
        $firstName: String!,
        $lastName: String!,
        $email: String!,
        $username: String!,
        $password: String!,
        $confirmPassword: String!,
    ) {
        register(
            registerInput: {
                firstName: $firstName,
                lastName: $lastName,
                email: $email,
                username: $username,
                password: $password,
                confirmPassword: $confirmPassword,
            }
        ) {
            id,
            email,
            firstName,
            lastName,
            username,
            createdAt,
            token,
        }
    }
`;


export default Register;