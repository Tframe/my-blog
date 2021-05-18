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
    const { user } = useContext(AuthContext);
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1);

    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (_, { name }) => setActiveItem(name);

    //If a user is logged in, display a menu bar with user name and logout,
    //otherwise display a register and login button.
    const menuBar = user ? (
        <Menu pointing secondary size='massive' color='orange'>
            <Menu.Item
                name='explore'
                active={activeItem === 'explore'}
                onClick={handleItemClick}
                as={Link}
                to='/explore'
            />
            <Menu.Item
                name='build'
                active={activeItem === 'build'}
                onClick={handleItemClick}
                as={Link}
                to='/build'
            />
            <Menu.Item
                name='parent'
                active={activeItem === 'parent'}
                onClick={handleItemClick}
                as={Link}
                to='/parent'
            />
            <Menu.Item
                name='eat and drink'
                active={activeItem === 'eat and drink'}
                onClick={handleItemClick}
                as={Link}
                to='/eat-drink'
            />
            <Menu.Item
                name='play'
                active={activeItem === 'play'}
                onClick={handleItemClick}
                as={Link}
                to='/play'
            />
            <Menu.Menu position='right'>
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
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu fluid widths={6} pointing secondary size='massive' color='red'>
            <Menu.Item
                name='explore'
                active={activeItem === 'explore'}
                onClick={handleItemClick}
                as={Link}
                to='/explore'
            />
            <Menu.Item
                name='build'
                active={activeItem === 'build'}
                onClick={handleItemClick}
                as={Link}
                to='/build'
            />
            <Menu.Item
                name='parent'
                active={activeItem === 'parent'}
                onClick={handleItemClick}
                as={Link}
                to='/parent'
            />
            <Menu.Item
                name='eat and drink'
                active={activeItem === 'eat and drink'}
                onClick={handleItemClick}
                as={Link}
                to='/eat-drink'
            />
            <Menu.Item
                name='play'
                active={activeItem === 'play'}
                onClick={handleItemClick}
                as={Link}
                to='/play'
            />
        </Menu >
    );

    return (
        menuBar
    )
}

export default MenuBar;