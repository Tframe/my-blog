/*
*   Author: Trevor Frame
*   Date: 04/13/2021
*   Description: Single article page
*/

import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Card, Grid, Button, Icon, Popup } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import CommentsCard from '../components/CommentsCard';
import CreateCommentForm from '../components/CreateCommentForm';

function SingleArticle(props) {
    //get the passed articleId from the props
    const articleId = props.match.params.articleId;
    //Check if a user is logged in and get information
    const { user } = useContext(AuthContext);

    //Called when gql Fetch_article and set information to getArticle
    const {
        data: { getArticle } = {}
    } = useQuery(FETCH_ARTICLE, {
        variables: {
            articleId,
        }
    });

    //Callback sent to deleteButton component
    function deleteArticleCallback() {
        window.location.replace('/');
    }

    //Whether we have article data yet
    let articleMarkup;
    //If there is no article information grabbed yet, show loading
    if (!getArticle) {
        articleMarkup = <p>Loading...</p>
    } else {
        //Information recented back after getArticle
        const { id, title, body, coverImageUrl, createdAt, username, author, comments, commentCount, likes, likeCount, topic } = getArticle;

        articleMarkup = (
            <div className='grids'>
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={15}>
                            <p className='topic'>
                                {topic}
                            </p>
                            <h1 className='header'>
                                {title}
                            </h1>
                            <p className='author'>
                                By: {author}
                            </p>
                            <p className='date'>
                                {moment(createdAt).format('MMMM Do YYYY')}
                            </p>
                            <img src={coverImageUrl} className='article-image' alt='Bad'></img>
                            <br />
                            <Button.Group fluid>
                                <LikeButton user={user} article={{ id, likeCount, likes }} />
                                <Popup
                                    content='Comment on article...'
                                    trigger={
                                        <Button labelPosition='right' style={{ 'marginLeft': '10px', 'marginRight': '10px' }}>
                                            <Button style={{ 'color': '#264653', 'backgroundColor': '#FDF4EC', 'borderRadius': '6px' }}>
                                                <Icon name='comments' />
                                                {commentCount} Comments
                                </Button>
                                        </Button>
                                    }
                                />
                                {user && user.username === username && (
                                    <DeleteButton articleId={id} callback={deleteArticleCallback} />
                                )}
                            </Button.Group>


                            <br />
                            <br />
                            <Card.Description>{body}</Card.Description>
                            <br />


                            <CommentsCard article={{ comments }} />
                            <CreateCommentForm articleId={id} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
    return articleMarkup;
}

//graphql fetch a single article
const FETCH_ARTICLE = gql`
    query($articleId: ID!) {
        getArticle(articleId: $articleId){
            id
            author
            title
            body
            topic
            coverImageUrl
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                name
                createdAt
                body
            }
        }
    }
`;

export default SingleArticle;