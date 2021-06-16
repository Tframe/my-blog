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
         extraPhotosAndBodies {
             body
             photoUrl
         }
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
            extraPhotosAndBodies {
                body
                photoUrl
            }
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

export const FETCH_BROWSER_FINGERPRINTS_QUERY = gql`
    {    
        getBrowserFingerprints{
            browserFingerprintId,
            createdAt,
        }
    }
`;

export const FETCH_BROWSER_FINGERPRINT_BY_ID_QUERY = gql`
    query($browserFingerprintId: String!)  {
        getFingerprint(browserFingerprintId: $browserFingerprintId){
            browserFingerprintId,
            createdAt
        }
    }
`;

