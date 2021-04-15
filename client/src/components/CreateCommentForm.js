/*
*   Author: Trevor Frame
*   Date: 04/13/2021
*   Description: Form for adding a comment to an article
*/

import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useForm } from '../util/hooks';
import { FETCH_ARTICLES_QUERY } from '../util/graphql';

function CreateCommentForm({ articleId }) {

    //For setting errors to display if any
    const [errors, setErrors] = useState({});

    //Use the useForm hook to change and submit values by passing a 
    //call back function to add comment to article
    const { onChange, onSubmit, values } = useForm(addComment, {
        articleId,
        email: '',
        name: '',
        body: '',
    });

    
    const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
        //If mutation is successful, trigger and reset fields to blank
        update() {
            values.email = '';
            values.name = '';
            values.body = '';
            setErrors({});
        },
        //If any errors come back from server side submit, add them to 
        //an array of errors that will then be displayed
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
    });

    //Workaround
    function addComment() {
        createComment();
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Add Comment</h1>
                <Form.Input
                    label='Name'
                    placeholder='Name...'
                    name='name'
                    type='text'
                    value={values.name}
                    error={errors.name ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label='Email (Optional)'
                    placeholder='Email...'
                    name='email'
                    type='email'
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                />
                <Form.TextArea
                    label='Comment'
                    placeholder='Comment...'
                    name='body'
                    type='text'
                    value={values.body}
                    error={errors.body ? true : false}
                    onChange={onChange}
                />
                <Button type='submit' primary>
                    Post Comment
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
const CREATE_COMMENT = gql`
    mutation createComment(
        $articleId: ID!,
        $name: String!,
        $email: String!,
        $body: String!,
    ) {
       createComment(
            articleId: $articleId,
            name: $name,
            email: $email,
            body: $body,
       ) {
           id
           comments {
                id
                name
                body
                createdAt
           }
           commentCount
       }
    }
`;

export default CreateCommentForm;