/*
*   Author: Trevor Frame
*   Date: 04/01/2021
*   Description: Checks if logged in, if we try to go to login or register,
*   reroutes to the home page.
*/

import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';

//Receives component route with attributes. If there is a user
//Set everything to be a redirect to home, if not logged in,
//Use the provided component from the Router.
function AuthRoute({ component: Component, ...rest }) {
    const { user } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                user ? <Redirect to='/' /> : <Component {...props} />
            }
        />
    )
}

export default AuthRoute;