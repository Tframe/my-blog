import gql from 'graphql-tag';

export const FETCH_ARTICLES_QUERY = gql`
{
    getArticles {
         id
         username
         author
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