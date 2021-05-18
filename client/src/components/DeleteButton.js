/*
*   Author: Trevor Frame
*   Date: 04/13/2021
*   Description: Component for delete article button
*/

import React, { useState } from 'react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon, Popup } from 'semantic-ui-react';

function DeleteButton({ articleId, callback }) {

    const [confirmOpen, setConfirmOpen] = useState(false);

    //Call delete gql mutation
    const [deleteArticle] = useMutation(DELETE_ARTICLE, {
        //Once delete is sucessful, close modal
        update() {
            setConfirmOpen(false);
            if (callback) {
                callback();
            }
        },
        variables: {
            articleId
        },
    });

    return (
        <>
            <Popup
                content='Delete article...'
                trigger={
                    <Button
                        as='div'
                        color='red'
                        floated='right'
                        style={{'borderRadius':'6px'}}
                        onClick={() => setConfirmOpen(true)}
                    >
                        <Icon name='trash' style={{ margin: 0 }} />
                    </Button>
                }
            />
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deleteArticle}
            />
        </>
    );
}

//gql delete article mutation
const DELETE_ARTICLE = gql`
    mutation deleteArticle($articleId: ID!) {
        deleteArticle(articleId: $articleId)
    }
`;

export default DeleteButton;
