/*
*   Author: Trevor Frame
*   Date: 04/01/2021
*   Description: Creates menu bar component using Semantic UI
*/

import React, { useState, useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function MenuBar() {
    const { user, logout } = useContext(AuthContext);
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1);

    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, { name }) => setActiveItem(name);

    //If a user is logged in, display a menu bar with user name and logout,
    //otherwise display a register and login button.
    const menuBar = user ? (
        <Menu pointing secondary size='massive' color='red'>
            <Menu.Item
                name='explore'
                active={activeItem === 'explore'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />
            <Menu.Item
                name='build'
                active={activeItem === 'build'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />
            <Menu.Item
                name='father'
                active={activeItem === 'father'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />
            <Menu.Item
                name='eat and drink'
                active={activeItem === 'eat and drink'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />
            <Menu.Item
                name='play'
                active={activeItem === 'play'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />
            <Menu.Item
                name='level up'
                active={activeItem === 'level up'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />
            <Menu.Menu position='right'>
                {/* <Menu.Item
                    name='about'
                    active={activeItem === 'about'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/'
                />
                <Menu.Item
                    name='contact'
                    active={activeItem === 'contact'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/'
                /> */}
                <Menu.Item
                    name={user.username}
                    active
                    as={Link}
                    to='/'
                />
                <Menu.Item
                    name='create article'
                    active={activeItem === 'create article'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/create-article'
                />
                <Menu.Item
                    name='logout'
                    onClick={logout}
                />
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary size='massive' color='red'>
            <Menu.Item
                name='explore'
                active={activeItem === 'explore'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />
            <Menu.Item
                name='build'
                active={activeItem === 'build'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />
            <Menu.Item
                name='father'
                active={activeItem === 'father'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />
            <Menu.Item
                name='eat and drink'
                active={activeItem === 'eat and drink'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />
            <Menu.Item
                name='play'
                active={activeItem === 'play'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />
            <Menu.Item
                name='level up'
                active={activeItem === 'level up'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />
            <Menu.Menu position='right'>
                {/* <Menu.Item
                    name='about'
                    active={activeItem === 'about'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/'
                />
                <Menu.Item
                    name='contact'
                    active={activeItem === 'contact'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/'
                /> */}
                <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/login'
                />
                <Menu.Item
                    name='register'
                    active={activeItem === 'register'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/register'
                />
            </Menu.Menu>
        </Menu >
    );

    return (
        menuBar
    )
}

export default MenuBar;