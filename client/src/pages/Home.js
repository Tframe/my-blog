/*
*   Author: Trevor Frame
*   Date: 03/31/2021
*   Description: Home screen page will display recent articles
*/

//TODO: Order most recent articles... Or... Most liked

import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Button, Grid, Transition } from 'semantic-ui-react';

import ArticleCard from '../components/ArticleCard';
import { FETCH_ARTICLES_QUERY } from '../util/graphql';
import { AuthContext } from '../context/auth';

function Home() {

    const cardColors = [ '#F8B377', '#FAC99E', '#FAD3B2', '#FCDFC5']

    //number of articles to display
    const [numArticles, setNumArticles] = React.useState(5);
    //increase number of articles
    const loadMoreArticles = () => setNumArticles(c => c + 5);

    useContext(AuthContext);

    //Load articles if we can get any
    const {
        loading,
        data: { getArticles: articles } = {}
    } = useQuery(FETCH_ARTICLES_QUERY);

    return (
        <div className='grids'>
            <Grid columns={1}>
                <Grid.Row className='page-title'>
                    <h1>Recent Articles</h1>
                </Grid.Row>
                <Grid.Row className='articles'>
                    {loading ? (
                        <h1>Loading articles...</h1>
                    ) : (
                        <Transition.Group>
                            {articles &&
                                articles.slice(0, numArticles).map((article, index) => (
                                    <Grid.Column key={article.id} style={{ marginBottom: 20 }}>
                                        <ArticleCard article={article} color={cardColors[(index)%cardColors.length]} />
                                    </Grid.Column>
                                ))}
                        </Transition.Group>
                    )}
                </Grid.Row>
            </Grid>
            {
                articles && articles.length > numArticles ?
                    (<Button fluid onClick={loadMoreArticles} style={{ 'backgroundColor': '#2A9D8F', 'color': 'white' }}>
                        Load more articles...
                    </Button>) : (<> </>)
            }
        </div >
    );
}


export default Home;