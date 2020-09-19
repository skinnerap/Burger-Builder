import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavItem.module.css';

const navItem = ( props ) => {

    let link = <NavLink to={props.link} exact={props.exact} activeClassName={classes.active}>{props.children}</NavLink>;

    if(props.link === 'https://github.com/skinnerap/Burger-Builder') {
        link = <a href='https://github.com/skinnerap/Burger-Builder' target="_blank" alt="Github Repo for this project">Source Code</a>
    }
    return (
        <li className={classes.NavItem}>
            {link}
        </li>
    )
}

export default navItem;