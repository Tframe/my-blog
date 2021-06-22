/*
*   Author: Trevor Frame
*   Date: 06/04/2021
*   Description: Browser Fingerprint Id persistent global data
*/

import React, { createContext, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';


const BrowserFPIdContext = createContext({
    browserFingerprintId: null,
});

function BrowserFPProvider(props) {

    const [browserFingerprintId, setBrowserFPId] = useState('');

    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load();

    async function getBrowserId() {
        // Get the visitor identifier when you need it.
        const fp = await fpPromise;
        const result = await fp.get();

        // This is the visitor identifier:
        const visitorId = result.visitorId;
        setBrowserFPId(visitorId);
    }

    getBrowserId();

    return (
        <BrowserFPIdContext.Provider
            value={{ browserFingerprintId: browserFingerprintId }}
            {...props}
        />
    )

}

export { BrowserFPIdContext, BrowserFPProvider };