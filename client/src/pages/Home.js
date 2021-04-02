/*
*   Author: Trevor Frame
*   Date: 03/31/2021
*   Description: Home screen page will display recent articles
*/

//TODO: Order most recent articles... Or... Most liked

import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import ArticleCard from '../components/ArticleCard';
import ArticleForm from '../components/ArticleForm';


function Home() {
    //Get user information in persistent context
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
                {user && (
                    <Grid.Column>
                        <ArticleForm>

                        </ArticleForm>
                    </Grid.Column>
                )}
                {loading ? (
                    <h1>Loading articles...</h1>
                ) : (
                    articles &&
                    articles.map((article) => (
                        <Grid.Column key={article.id} style={{ marginBottom: 50 }}>
                            <ArticleCard article={article} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    );
}

const FETCH_ARTICLES_QUERY = gql`
   { 
       getArticles {
            id
            author
            description
            title
            body
            likeCount
            likes {
                username
                createdAt
            }
            commentCount
            comments {
                id
                username
                body
                createdAt
            }
            createdAt
        }
    }
`;

export default Home;