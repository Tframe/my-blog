/*
*   Author: Trevor Frame
*   Date: 06/04/2021
*   Description: Browser Fingerprint Id persistent global data
*/

import React, { createContext, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';


const BrowserFPIdContext = createContext({
    browserFPId: null,
});

function BrowserFPProvider(props) {

    const [browserFPId, setBrowserFPId] = useState('');

    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load();

    async function getBrowserId() {
        // Get the visitor identifier when you need it.
        const fp = await fpPromise;
        const result = await fp.get();

        // This is the visitor identifier:
        const visitorId = result.visitorId;
        console.log('like visId ' + visitorId);
        setBrowserFPId(visitorId);
    }

    getBrowserId();

    return (
        <BrowserFPIdContext.Provider
            value={{ browserFPId: browserFPId }}
            {...props}
        />
    )

}

export { BrowserFPIdContext, BrowserFPProvider };