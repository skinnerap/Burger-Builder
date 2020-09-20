import React from 'react';
import classes from './NavItems.module.css';
import NavItem from '../NavItems/NavItem/NavItem';

const navItems = () => {
    return (
        <ul className={classes.NavItems}>
            <NavItem link='/' exact>Burger Builder</NavItem>
            <NavItem link='/orders'>User Creations</NavItem>
            <NavItem link='https://github.com/skinnerap/Burger-Builder'>Source Code</NavItem>
        </ul>
    )
}

export default navItems;