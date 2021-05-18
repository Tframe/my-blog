import gql from 'graphql-tag';

export const FETCH_ARTICLES_QUERY = gql`
{
    getArticles {
         id
         username
         author
         topic
         coverImageUrl
         description
         title
         body
         likeCount
         likes {
             username
         }
         commentCount
         comments {
             id
             email
             name
             body
             createdAt
         }
         createdAt
     }
 }
`;

export const FETCH_ARTICLES_TOPIC_QUERY = gql`
    query($topic: String!) {
        getArticlesByTopic(topic: $topic){
            id
            username
            author
            topic
            coverImageUrl
            description
            title
            body
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                email
                name
                body
                createdAt
            }
            createdAt
        }
    }  
`;