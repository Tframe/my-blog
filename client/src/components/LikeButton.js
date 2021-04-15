/*
*   Author: Trevor Frame
*   Date: 04/12/2021
*   Description: Like button functionalities
*/

import React, { useState, useEffect } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';


function LikeButton({ user, article: { id, likeCount, likes } }) {
    //Sets array of liked articles to false already
    const [liked, setLiked] = useState(false);

    //Determine if liked or not
    useEffect(() => {
        //Check if user has liked already
        if (user && likes.find((like) => like.username === user.username)) {
            setLiked(true);
        } else { 
            setLiked(false); 
        }
        //If either user or likes change, recalculate value
    }, [user, likes]);

    //This is the call like_article mutation and gets back the 
    //liked articles
    const [likeArticle] = useMutation(LIKE_ARTICLE, {
        variables: { articleId: id }
    });

    //Creates a like button.
    //Checks if user is logged in, if not, selecting sends to login page
    //If logged in, checks if user already liked, if so, then highlight icon
    //If not, outline icon.
    const likeButton = user ? (
        liked ? (
            <Button color='red'>
                <Icon name='heart' />
                    Likes
            </Button>
        ) : (
            <Button color='red' basic>
                <Icon name='heart' />
                    Likes
            </Button>
        )
    ) : (
        <Button as={Link} to='/login' color='red' basic>
            <Icon name='heart' />
                Likes
        </Button>
    );

    return (
        <Button as='div' labelPosition='right' onClick={ user ? likeArticle : undefined }>
            {likeButton}
            <Label basic color='red' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    );
}

const LIKE_ARTICLE = gql`
    mutation likeArticle($articleId: ID!) {
        likeArticle(articleId: $articleId) {
            id
            likes {
                id
                username
            }
            likeCount
        }
    }
`;

export default LikeButton;