/*
*   Author: Trevor Frame
*   Date: 03/31/2021
*   Description: Component for article card to display information
*/

import React, { useContext } from 'react';
import { Button, Card, Image, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

function ArticleCard({ 
    article: { id, username, author, title, description, body, createdAt, likeCount, commentCount, likes, comments } 
}) {

    const { user } = useContext(AuthContext);

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
                <LikeButton user={ user } article={{ id, likes, likeCount }} />
                <Button labelPosition='right' as={Link} id='comment-button' to={`/articles/${id}`}>
                    <Button basic color='blue'>
                        <Icon name='comments' />
                        Comments
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
                {user && user.username === username && (
                    <DeleteButton articleId={id} />
                )}
            </Card.Content>
        </Card>

    )

}

export default ArticleCard;