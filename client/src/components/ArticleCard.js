/*
*   Author: Trevor Frame
*   Date: 03/31/2021
*   Description: Component for article card to display information
*/

import React, { useContext } from 'react';
import { Button, Card, Image, Icon, Label, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

function ArticleCard({
    article: { id, username, author, title, coverImageUrl, description, body, createdAt, likeCount, commentCount, likes, comments }
}) {

    const { user } = useContext(AuthContext);

    return (
        <Card style={{ height: '450px' }} fluid>
            <Card.Content>
                <Image src={coverImageUrl} href={`/articles/${id}`} />
                <Card.Header className='card-title' as={Link} to={`/articles/${id}`}>
                    {title}
                </Card.Header>
                <Card.Description>Written by: {author}</Card.Description>
                <Card.Meta>
                    {moment(createdAt).format('MMMM Do YYYY')}
                </Card.Meta>
                <Card.Description>
                    {description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group fluid>
                    <LikeButton user={user} article={{ id, likes, likeCount }} />
                    <Popup
                        content='Comment on article...'
                        trigger={
                            <Button labelPosition='right' as={Link} id='comment-button' to={`/articles/${id}`}>
                                <Button basic color='blue'>
                                    <Icon name='comments' />
                        Comments
                    </Button>
                                <Label basic color='blue' pointing='left'>
                                    {commentCount}
                                </Label>
                            </Button>
                        }
                    />
                </Button.Group>

                {/* {user && user.username === username && (
                    <DeleteButton articleId={id} />
                )} */}
            </Card.Content>
        </Card>

    )

}

export default ArticleCard;