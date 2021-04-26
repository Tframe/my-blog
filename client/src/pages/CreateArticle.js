/*
*   Author: Trevor Frame
*   Date: 04/01/2021
*   Description: Create Article Form component.
*/

import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag'

import { useForm } from '../util/hooks';
import { FETCH_ARTICLES_QUERY } from '../util/graphql';
import UploadImage from '../components/UploadImage';

function CreateArticle() {

    //For setting errors to display if any
    const [errors, setErrors] = useState({});

    //Use the useForm hook to change and submit values by passing a 
    //call back function to register a user.
    const { onChange, onSubmit, values } = useForm(createArticleCallback, {
        title: '',
        body: '',
        description: '',
        coverImageUrl: '',
    });

    const [createArticle, { loading }] = useMutation(CREATE_ARTICLE, {
        //If mutation is successful, trigger and get result back
        //Destructure from result to get the data,
        //then get register from data and give alias userData.
        update(proxy, result) {

            //Go through cache to get articles
            const data = proxy.readQuery({
                query: FETCH_ARTICLES_QUERY,
            });
            //get proxy articles to make sure new article is included
            data.getArticles = [result.data.createArticle, ...data.getArticles];
            proxy.writeQuery({ query: FETCH_ARTICLES_QUERY, data });
            window.location.replace('/');
        },
        //If any errors come back from server side submit, add them to 
        //an array of errors that will then be displayed
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.exception.errors);
        },

        variables: values,
    });

    function createArticleCallback() {
        createArticle();
    }

    //Callback function for upload image component
    function imageCallback(imageUrl){
        values.coverImageUrl = imageUrl;
        console.log(values);
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h2>Create an article:</h2>
                <Form.Input
                    label='Title'
                    placeholder='Title'
                    name='title'
                    type='text'
                    onChange={onChange}
                    value={values.title}
                    error={errors.title ? true : false}
                />
                <Form.TextArea
                    label='Body'
                    placeholder='Body'
                    name='body'
                    type='text'
                    onChange={onChange}
                    value={values.body}
                    error={errors.body ? true : false}
                />
                <Form.TextArea
                    label='Description'
                    placeholder='Description'
                    name='description'
                    type='text'
                    onChange={onChange}
                    value={values.description}
                    error={errors.description ? true : false}
                />
                <UploadImage callBack = {imageCallback}/>
                <br/>
                <Button type='submit' color='blue'>
                    Submit
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
            )
            }
        </div>
    )

}

//Graphql create article mutation setup
//Using will call the createArticle mutation 
//setup on server side and returns information back
const CREATE_ARTICLE = gql`
    mutation createArticle(
        $title: String!,
        $body: String!,
        $description: String!,
        $coverImageUrl: String!,
    ) {
        createArticle(
            title: $title,
            body: $body,
            description: $description,
            coverImageUrl: $coverImageUrl,
        ){
            id
            author
            title
            coverImageUrl
            body
            description
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
                email
                name
                createdAt
            }
            commentCount
        }
    }
`;

export default CreateArticle;