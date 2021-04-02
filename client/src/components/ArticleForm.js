/*
*   Author: Trevor Frame
*   Date: 04/01/2021
*   Description: Create Article Form component.
*/

import React from 'react'
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';

function ArticleForm() {

    //Use the useForm hook to change and submit values by passing a 
    //call back function to register a user.
    const { onChange, onSubmit, values } = useForm(createArticleCallback, {
        title: '',
        body: '',
    });

    const [createArticle, { error }] = useMutation(CREATE_ARTICLE, {
        variables: values,
        update(_, result) {
            console.log(result);
            values.title = '';
            values.body = '';
        }
    });

    function createArticleCallback() {
        createArticle();
    }

    return (
        <Form onSubmit={onSubmit}>
            <h2>Create an article:</h2>
            <Form.Field>
                <Form.Input
                    placeholder='hi world'
                    name='title'
                    onChange={onChange}
                    value={values.title}
                />
                <Form.Input
                    placeholder='hi world'
                    name='body'
                    onChange={onChange}
                    value={values.body}
                />
                <Button type='submit' color='blue'>
                    Submit
                </Button>
            </Form.Field>
        </Form>
    )
}

const CREATE_ARTICLE = gql`
    mutation createArticle(
        $body: String!,
        $title: String!,
    ) {
        id
        body
        createdAt
        username
        likes {
            id
            username
            createdAt
        }
        likeCount
        comments{
            id
            body
            username
            createdAt
        }
        commentCount
    }
`

export default ArticleForm;