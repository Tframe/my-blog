/*
*   Author: Trevor Frame
*   Date: 04/13/2021
*   Description: Single article page
*/

import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Image, Card, Grid, Button, Icon, Label } from 'semantic-ui-react';
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
    function deleteArticleCallback(){
        props.history.push('/');
    }

    //Whether we have article data yet
    let articleMarkup;
    //If there is no article information grabbed yet, show loading
    if (!getArticle) {
        articleMarkup = <p>Loading...</p>
    } else {
        //Information recented back after getArticle
        const { id, title, body, createdAt, username, author, comments, commentCount, likes, likeCount } = getArticle;

        articleMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            src='https://react.semantic-ui.com/images/avatar/large/elliot.jpg'
                            size='small'
                            float='right' />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{title}</Card.Header>
                                <Card.Description>Written by: {author}</Card.Description>
                                <Card.Meta>{moment(createdAt).format('MMMM Do YYYY')}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} article={{ id, likeCount, likes }} />
                                <Button
                                    as='div'
                                    labelPosition='right'
                                    onClick={() => console.log('COMMENT')}
                                >
                                    <Button basic color='blue'>
                                        <Icon name='comments' />
                                    </Button>
                                    <Label basic color='blue' pointing='left'>
                                        {commentCount}
                                    </Label>
                                </Button>
                                {user && user.username === username && (
                                    <DeleteButton articleId={id} callback={deleteArticleCallback} />
                                )}
                            </Card.Content>
                        </Card>
                        <CommentsCard article={{ comments }} />
                        <CreateCommentForm articleId={id} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
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