/*
*   Author: Trevor Frame
*   Date: 04/12/2021
*   Description: Like button functionalities
*/

import React, { useState, useEffect, useContext } from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { BrowserFPIdContext } from '../context/browserFPId';


function LikeButton({ article: { id, likeCount, likes } }) {

    const { browserFingerprintId } = useContext(BrowserFPIdContext);

    //Sets array of liked articles to false already
    const [liked, setLiked] = useState(false);

    //Determine if liked or not
    useEffect(() => {
        //Check if user has liked already
        if (likes.find((like) => like.browserFingerprintId === browserFingerprintId)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
        //If either user or likes change, recalculate value
    }, [browserFingerprintId, likes]);

    //This is the call like_article mutation and gets back the 
    //liked articles
    const [likeArticle] = useMutation(LIKE_ARTICLE, {
        variables: { articleId: id, browserFingerprintId: browserFingerprintId }
    });

    //Creates a like button based on whether liked already or not
    const likeButton =
        liked ? (
            <Button style={{ 'color': '#DB3A34', 'backgroundColor': '#FDF4EC', 'paddingLeft': '10px', 'paddingRight': '10px', 'borderRadius': '6px' }}>
                <Icon name='heart' />
                {likeCount} Likes
            </Button>
        ) : (
            <Button style={{ 'color': '#264653', 'backgroundColor': '#FDF4EC', 'paddingLeft': '10px', 'paddingRight': '10px', 'borderRadius': '6px' }}>
                <Icon name='heart' />
                {likeCount} Likes
            </Button>
        )

    return (
        <Popup
            content='Like article...'
            trigger={
                <Button as='div' labelPosition='right' onClick={likeArticle}>
                    {likeButton}
                </Button>
            }
        />
    );
}

const LIKE_ARTICLE = gql`
    mutation likeArticle(
        $articleId: ID!, 
        $browserFingerprintId: String!,) 
    {
        likeArticle(
            articleId: $articleId, 
            browserFingerprintId: $browserFingerprintId,
        ) {
            id
            likes {
                id
                browserFingerprintId
            }
            likeCount
        }
    }
`;

export default LikeButton;