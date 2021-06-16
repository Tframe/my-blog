/*
*   Author: Trevor Frame
*   Date: 04/22/021
*   Description: Upload image component returns image url
*/

import React from 'react'
import { Form } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/react-hooks';

export default function UploadImage({ callBack }) {

    const [uploadImage] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => {
            callBack(data.uploadImage.url);
        }
    });

    const handleFileChange = event => {

        const file = event.target.files[0];

        if (!event.target.files[0]) {
            return;
        } else {
            uploadImage({ variables: { file } });
        }
    }

    return (
        <div>
            <Form.Input
                label='Image'
                placeholder='Image'
                name='image'
                type='file'
                onChange={handleFileChange}
            />
        </div>
    )
}

const UPLOAD_FILE = gql`
    mutation uploadImage($file: Upload!){
        uploadImage(file: $file){
            url,
        }
    }
`;