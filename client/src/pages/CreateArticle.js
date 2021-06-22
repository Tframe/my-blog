/*
*   Author: Trevor Frame
*   Date: 04/01/2021
*   Description: Create Article Form component.
*/

import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag'

import { useForm } from '../util/hooks';
import UploadImage from '../components/UploadImage';

function CreateArticle() {

    const [extraPhotosAndBodies, setPhtoAndBody] = useState([{ value: { photoUrl: '', body: '' } }]);   

    //Potential topics
    const topics = [
        { key: 'e', text: 'Explore', value: 'Explore' },
        { key: 'b', text: 'Build', value: 'Build' },
        { key: 'p', text: 'Parent', value: 'Parent' },
        { key: 'ed', text: 'Eat and Drink', value: 'Eat and Drink' },
        { key: 'pl', text: 'Play', value: 'Play' },
    ]

    //For setting errors to display if any
    const [errors, setErrors] = useState({});

    //Use the useForm hook to change and submit values by passing a 
    //call back function to register a user.
    const { onChange, onSubmit, values } = useForm(createArticleCallback, {
        title: '',
        extraPhotosAndBodies: [
            {
                photoUrl: '',
                body: '',
            }
        ],
        body: '',
        description: '',
        coverImageUrl: '',
    });

    //Used to update topic value.
    const selectTopic = (_, { value }) => {
        values.topic = value;
        
    };

    //Used to update topic value.
    function setExtraBody(index, event) {
        if(!values.extraPhotosAndBodies){
            values.extraPhotosAndBodies.push({body: event.target.value, photoUrl: ''});
        } else {
            values.extraPhotosAndBodies[index].body = event.target.value;
        } 
    };

     //Function to add new photo and body
     function addPicture() {
        const tempValues = [...extraPhotosAndBodies];
        tempValues.push({ value: { photoUrl: '', body: '' } });
        setPhtoAndBody(tempValues);
        values.extraPhotosAndBodies.push({ photoUrl: '', body: '' });
    }

    const [createArticle, { loading }] = useMutation(CREATE_ARTICLE, {
        //If mutation is successful, trigger and get result back
        //Destructure from result to get the data,
        //then get register from data and give alias userData.
        update() {
            window.location.replace('/home');
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
    function imageCallback(imageUrl) {
        values.coverImageUrl = imageUrl;
    }

    //Function callback for extra image creation
    function setExtraImageCallback(index, imageUrl){

        if(!values.extraPhotosAndBodies){
            values.extraPhotosAndBodies.push({body: '', photoUrl: imageUrl});
        } else {
            values.extraPhotosAndBodies[index].photoUrl = imageUrl;
        }
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h2>Create an article:</h2>
                <Form.Select
                    fluid
                    label='Topic'
                    options={topics}
                    placeholder='Topic'
                    onChange={selectTopic}
                    error={errors.topic ? true : false}
                />
                <Form.Input
                    label='Title'
                    placeholder='Title'
                    name='title'
                    type='text'
                    onChange={onChange}
                    value={values.title}
                    error={errors.title ? true : false}
                />
                <UploadImage callBack={imageCallback} />
                <Form.TextArea
                    label='Description'
                    placeholder='Description'
                    name='description'
                    type='text'
                    onChange={onChange}
                    value={values.description}
                    error={errors.description ? true : false}
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
                {extraPhotosAndBodies && extraPhotosAndBodies.map((field, index) => {
                    return (
                        <div key={`${field}-${index}`}>
                            <UploadImage callBack={(imageUrl) => setExtraImageCallback(index, imageUrl)} />
                            <Form.TextArea
                                label='Body'
                                placeholder='Body'
                                name={extraPhotosAndBodies[index].body}
                                type='text'
                                onChange={(event) => setExtraBody(index, event)}
                                value={extraPhotosAndBodies[index].body}
                                error={errors.extraPhotosAndBodies ? true : false}
                            />
                        </div>
                    )
                })}
                <br />
                <Button type='submit' color='blue'>
                    Submit
                </Button>
                <Button
                    as='div'
                    color='green'
                    floated='right'
                    style={{ 'borderRadius': '6px' }}
                    onClick={() => addPicture()}
                >
                    Add Picture
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
        $extraPhotosAndBodies: [ExtraPhotoAndBodyInput!]!,
        $description: String!,
        $coverImageUrl: String!,
        $topic: String!,
    ) {
        createArticle(
            title: $title,
            body: $body,
            extraPhotosAndBodies: $extraPhotosAndBodies,
            description: $description,
            coverImageUrl: $coverImageUrl,
            topic: $topic,
        ){
            id
            author
            title
            coverImageUrl
            body
            extraPhotosAndBodies{
                body
                photoUrl
            }
            description
            createdAt
            username
            topic
            likes {
                id
                browserFingerprintId
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