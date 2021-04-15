/*
*   Author: Trevor Frame
*   Date: 04/13/2021
*   Description: Comments card component displays all comments for
*   an article.
*/

import React from 'react'
import moment from 'moment';
import { Card } from 'semantic-ui-react';

function CommentsCard({ article: { comments } }) {

    return (
        <>
            {comments.map((comment) => (
                <Card fluid key={comment.id}>
                    <Card.Content>
                        <Card.Header>{comment.name}</Card.Header>
                        <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                        <Card.Description>{comment.body}</Card.Description>
                    </Card.Content>
                </Card>
            ))}
        </>
    );
}

export default CommentsCard;