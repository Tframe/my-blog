/*
*   Author: Trevor Frame
*   Date: 04/12/2021
*   Description: Like button functionalities
*/

import React, { useState, useEffect } from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
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
            <Button style={{ 'color': '#DB3A34', 'backgroundColor': '#FDF4EC', 'paddingLeft': '10px', 'paddingRight': '10px', 'borderRadius': '6px'  }}>
                <Icon name='heart' />
                {likeCount} Likes
            </Button>
        ) : (
            <Button style={{ 'color': '#264653', 'backgroundColor': '#FDF4EC', 'paddingLeft': '10px', 'paddingRight': '10px', 'borderRadius': '6px'   }}>
                <Icon name='heart' />
                {likeCount} Likes
            </Button>
        )
    ) : (
        <Button as={Link} to='/login' style={{ 'backgroundColor': '#FDF4EC', 'paddingLeft': '10px', 'paddingRight': '10px', 'borderRadius': '6px'   }}>
            <Icon name='heart' />
                {likeCount} Likes
        </Button>
    );

    return (
        <Popup
            content='Like article...'
            trigger={
                <Button as='div' labelPosition='right' onClick={user ? likeArticle : undefined}>
                    {likeButton}
                </Button>
            }
        />
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