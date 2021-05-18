/*
*   Author: Trevor Frame
*   Date: 05/07/2021
*   Description: Display articles base on topic
*/

import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import ArticleCard from '../components/ArticleCard';
import { FETCH_ARTICLES_TOPIC_QUERY } from '../util/graphql';

function ArticlesByTopic() {

    const cardColors = [ '#F8B377', '#FAC99E', '#FAD3B2', '#FCDFC5']
    
    var topic = window.location.pathname.substring(1);

    if (topic === 'eat-drink') {
        topic = 'Eat and Drink';
    } else {
        topic = topic.charAt(0).toUpperCase() + topic.slice(1);
    }

    //Load articles if we can get any
    const {
        loading,
        data: { getArticlesByTopic: articles } = {}
    } = useQuery(FETCH_ARTICLES_TOPIC_QUERY, {
        variables: { topic }
    });

    return (
        <div className='grids'>
            <Grid columns={1}>
                <Grid.Row className='page-title'>
                    <h1>{topic}</h1>
                </Grid.Row>
                <Grid.Row className='articles'>
                    {loading ? (
                        <h1>Loading articles...</h1>
                    ) : (
                        <Transition.Group>
                            {articles.length > 0 ?
                                articles.slice(0, 5).map((article, index) => (
                                    <Grid.Column key={article.id} style={{ marginBottom: 20 }}>
                                        <ArticleCard article={article} color={cardColors[(index)%cardColors.length]}/>
                                    </Grid.Column>
                                )) : <h3 className='no-articles'>No articles...</h3>
                            }
                        </Transition.Group>
                    )}
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default ArticlesByTopic;
