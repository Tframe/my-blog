/*
*   Author: Trevor Frame
*   Date: 03/31/2021
*   Description: Component for article card to display information
*/

import React from 'react';
import { Button, Card, Image, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';

function likeArticle() {
    console.log('Like article');
}

function commentArticle() {
    console.log('Comment article');
}

function ArticleCard({ article: { id, author, title, description, body, createdAt, likeCount, commentCount, likes, comments } }) {

    return (
        <Card fluid>
            <Card.Content>
                <Image src='https://react.semantic-ui.com/images/avatar/large/elliot.jpg' />
                <Card.Header className='card-title'>
                    {title}
                </Card.Header>
                <Card.Meta>
                    {moment(createdAt).format('MMMM Do YYYY')}
                </Card.Meta>
                <Card.Description>
                    {description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as='div' labelPosition='right' onClick={likeArticle}>
                    <Button color='red' basic>
                        <Icon name='heart' />
                        Likes
                    </Button>
                    <Label as='a' basic color='red' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right' onClick={commentArticle}>
                    <Button basic color='blue'>
                        <Icon name='comments' />
                        Comments
                    </Button>
                    <Label as='a' basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>

    )

}

export default ArticleCard;