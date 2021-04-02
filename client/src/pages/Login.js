/*
*   Author: Trevor Frame
*   Date: 04/01/2021
*   Description: Login page
*/

import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth'
import { useForm } from '../util/hooks';

function Login(props) {

    //Get access to user context
    const context = useContext(AuthContext);

    //For setting errors to display if any
    const [errors, setErrors] = useState({});

    //Use the useForm hook to change and submit values by passing a 
    //call back function to register a user.
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: '',
    });

    //Function to call REGISTER_USER mutation to create a user through apollo
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        //If mutation is successful, trigger and get result back
        //Destructure from result to get the data,
        //then get login from data and give alias userData.
        update(_, { data: { login: userData }}) {
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
    function loginUserCallback() {
        loginUser();
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
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
                <Button type='submit' primary>
                    Login
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
const LOGIN_USER = gql`
    mutation login(
        $username: String!,
        $password: String!,
    ) {
        login(
            username: $username,
            password: $password,
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

export default Login;