/*
*   Author: Trevor Frame
*   Date: 03/31/2021
*   Description: Component for article card to display information
*/

import React from 'react';
import { Button, Card, Icon, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import LikeButton from './LikeButton';

function ArticleCard({
    article: { id, author, title, coverImageUrl, description, createdAt, likeCount, commentCount, likes, topic },
    color
}) {

    return (
        <Card style={{ 'height': 'auto', 'marginBottom': '20px', 'backgroundColor': color }} fluid>
            <div className='card-content'>
                <p>
                    <a className='topic' href={`/articles/${id}`}>
                        {topic}
                    </a>
                </p>
                <p className='card-paragraph'>
                    <a className='card-title' href={`/articles/${id}`}>
                        {title.toUpperCase()}
                    </a>
                </p>
                <p className='card-paragraph'>
                    <a className='author' href={`/articles/${id}`}>
                        {author}
                    </a>
                </p>
                <p className='card-paragraph'>
                    <div className='date'>
                        {moment(createdAt).format('MM')}.{moment(createdAt).format('DD')}.{moment(createdAt).format('YY')}
                    </div>
                </p>
                <a href={`/articles/${id}`}>
                    <img className='article-image' style={{ display: 'block' }} src={coverImageUrl} alt='Not found' />
                </a>
                <div className='description'>
                    {description.length > 200 ? description.substring(0, 200) + ' . . . ' : description}
                </div>
            </div>
            <Card.Content extra>
                <Button.Group fluid>
                    <LikeButton article={{ id, likes, likeCount }} />
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