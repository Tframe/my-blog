/*
*   Author: Trevor Frame
*   Date: 03/31/2021
*   Description: Home screen page will display recent articles
*/

//TODO: Order most recent articles... Or... Most liked

import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import ArticleCard from '../components/ArticleCard';
import { FETCH_ARTICLES_QUERY } from '../util/graphql';
import { AuthContext } from '../context/auth';

function Home() {

    const { user } = useContext(AuthContext);

    //Load articles if we can get any
    const {
        loading,
        data: { getArticles: articles } = {}
    } = useQuery(FETCH_ARTICLES_QUERY);

    return (
        <Grid columns={3}>
            <Grid.Row className='page-title'>
                <h1>Recent Articles</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Loading articles...</h1>
                ) : (
                    <Transition.Group>
                        {articles &&
                            articles.map((article) => (
                                <Grid.Column key={article.id} style={{ marginBottom: 20 }}>
                                    <ArticleCard article={article} />
                                </Grid.Column>
                            ))}
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    );
}


export default Home;