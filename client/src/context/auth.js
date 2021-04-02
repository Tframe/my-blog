/*
*   Author: Trevor Frame
*   Date: 04/01/2021
*   Description: Authentication persistent global data
*   to track tokens
*/

import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null,
}

//Check if token exists
if(localStorage.getItem('jwtToken')){
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
    //Check if token is expired,
    //If expired, remove token from local storage,
    //otherwise store user information from token
    if(decodedToken.exp * 1000 < Date.now()){
        localStorage.removeItem('jwtToken');
    } else {
        initialState.user = decodedToken;
    }
}

const AuthContext = createContext ({
    user: null,
    login: (userData) => {},
    logout: () => {},
});

function authReducer(state, action) {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            }
        default:
            return state;
    }
}

function AuthProvider(props) {
    //Dispatch any action and attach a type and payload and reducer listens to it
    const [state, dispatch] = useReducer(authReducer, initialState);

    //Dispatch login with userData payload to change context with current logged in user
    function login(userData) {
        //Store the token in local storage
        localStorage.setItem('jwtToken', userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData,
        });
    };

    function logout(){
        //Remove token from local storage
        localStorage.removeItem('jwtToken');
        dispatch({
            type: 'LOGOUT',
        });
    };

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    )

}

export { AuthContext, AuthProvider };