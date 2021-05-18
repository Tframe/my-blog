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

    const cardColors = [ '#F8B377', '#FAC99E', '#FAD3B2', '#FCDFC5']

    return (
        <>
            {comments.map((comment, index) => (
                <Card style={{ 'backgroundColor': cardColors[(index)%cardColors.length] }} fluid key={comment.id}>
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