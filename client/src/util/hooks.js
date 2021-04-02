/*
*   Author: Trevor Frame
*   Date: 03/31/2021
*   Description: Helper functions that will be reused throughout
*   application.
*/

import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {

    //For setting values on change
    const [values, setValues] = useState(initialState);

    //Takes event and get current values and new values to it.
    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        callback();
    };

    return {
        onChange,
        onSubmit,
        values,
    };
};