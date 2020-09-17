import React from 'react';
import classes from './NavItems.module.css';
import NavItem from '../NavItems/NavItem/NavItem';

const navItems = () => {
    return (
        <ul className={classes.NavItems}>
            <NavItem link='/' active>Burger Builder</NavItem>
            <NavItem link='/'>Cart</NavItem>
            <NavItem link='/'>Source Code</NavItem>
            <NavItem link='/'>Portfolio</NavItem>
        </ul>
    )
}

export default navItems;