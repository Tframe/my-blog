/*
*   Author: Trevor Frame
*   Date: 04/30/2021
*   Description: Bottom banner for pages
*/

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function Footer() {
    const { user, logout } = useContext(AuthContext);

    const footer = !user ? (
        <div className='footer'>
            <div className='footer-content'>
                <a className='footer-text' href='/about'>About</a>
                <br />
                <a className='footer-text' href='/contact-us'>Contact</a>
                <br />
                <a className='footer-text' href='/privacy'>Privacy</a>
                <br />
                <a className='footer-text' href='/login'>Login/Register</a>
                <br />
            </div>
        </div>
    ) : (
        <div className='footer'>
            <div className='footer-content'>
                <a className='footer-text' href='/about'>About</a>
                <br />
                <a className='footer-text' href='/contact-us'>Contact</a>
                <br />
                <a className='footer-text' href='/privacy'>Privacy</a>
                <br />
                <div className='footer-text' as={Link} onClick={logout}>
                    <p>
                        <a className='footer-text' href='/'>Logout</a>
                    </p>
                </div>
                <br />
            </div>
        </div>
    );

    return (
        footer
    );
}

export default Footer;