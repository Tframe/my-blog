/*
*   Author: Trevor Frame
*   Date: 06/01/2021
*   Description: Welcome screen
*/


import React, { useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function Welcome() {

    const [values, setValues] = useState('');

    //const [browserFingerPrint, setBrowserFP] = useState('');

    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load();

    async function getBrowserId() {
        // Get the visitor identifier when you need it.
        const fp = await fpPromise;
        const result = await fp.get();

        // This is the visitor identifier:
        const visitorId = result.visitorId;
        console.log('vis ' + visitorId);
        return visitorId;
    }

    //Apollo add browser fingerprint to mongodb
    const [addBrowserFingerprint] = useMutation(ADD_BROWSER_FINGERPRINT_ID, {
        onCompleted: () => {
            window.location.replace('/home');
        },
        variables: values,
    });

    //Apollo check if browser fingerprint is already stored in mongodb
    const [getBrowserFingerprint] = useLazyQuery(GET_BROWSER_FINGERPRINT_ID, {
        onCompleted: (data) => {
            if (data && data.getBrowserFingerprint == null) {
                addBrowserFingerprint();
            } else {
                window.location.replace('/home');
            }
        },
        onError: () => {
            console.log('ERROR');
        },
        variables: values,
    });

    getBrowserId()
        .then((visitorId) => {
            setValues({ browserFingerprintId: visitorId });
            if (values.browserFingerprintId !== '') {
                //check if id exists
                getBrowserFingerprint();
            }
        });

    return (
        <div className='welcome'>
            Welcome!
        </div >
    );
}

//Using will call the registerInput mutation 
//setup on server side and returns information back
const ADD_BROWSER_FINGERPRINT_ID = gql`
    mutation addBrowserFingerprint(
        $browserFingerprintId: String!,
    ) {
        addBrowserFingerprint(
            browserFingerprintId: $browserFingerprintId,
       ) {
            browserFingerprintId
            createdAt
       }
    }
`;

//Using will call the registerInput mutation 
//setup on server side and returns information back
const GET_BROWSER_FINGERPRINT_ID = gql`
    query getBrowserFingerprint(
        $browserFingerprintId: String!,
    ) {
        getBrowserFingerprint(
            browserFingerprintId: $browserFingerprintId,
       ) {
            browserFingerprintId
            createdAt
       }
    }
`;

export default Welcome;