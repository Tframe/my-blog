/*
*   Author: Trevor Frame
*   Date: 03/31/2021
*   Description: Component for article card to display information
*/

import React, { useContext } from 'react';
import { Button, Card, Icon, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';

function ArticleCard({
    article: { id, author, title, coverImageUrl, description, createdAt, likeCount, commentCount, likes, topic },
    color
}) {

    const { user } = useContext(AuthContext);

    return (
        <Card style={{ 'height': 'auto', 'marginBottom': '20px', 'backgroundColor': color }} fluid>
            <Card.Content>
                <Card.Description className='topic'>{topic}</Card.Description>
                <a className='card-title' href={`/articles/${id}`}>
                    {title}
                </a>
                <Card.Description>By: {author}</Card.Description>
                <Card.Meta>
                    {moment(createdAt).format('MMMM Do YYYY')}
                </Card.Meta>
                <a href={`/articles/${id}`}>
                    <img className='article-image' style={{ display: 'block' }} src={coverImageUrl} alt='Bad' />
                </a>
                <Card.Description>
                    {description.length > 200 ? description.substring(0, 200) + ' . . . ' : description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group fluid>
                    <LikeButton user={user} article={{ id, likes, likeCount }} />
                    <Popup
                        content='Comment on article...'
                        trigger={
                            //TODO: Make button scroll to comments section
                            <Button labelPosition='right' as={Link} to={`/articles/${id}`} style={{ 'marginLeft': '10px', 'marginRight': '10px' }}>
                                <Button style={{ 'color': '#264653', 'backgroundColor': '#FDF4EC', 'borderRadius': '6px' }}>
                                    <Icon name='comments' />
                                    {commentCount} Comments
                                </Button>
                            </Button>
                        }
                    />
                </Button.Group>
            </Card.Content>
        </Card>

    )

}

export default ArticleCard;