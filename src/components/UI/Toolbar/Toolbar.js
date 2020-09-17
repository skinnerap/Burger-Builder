import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../Navigation/NavItems/NavItems';
const toolBar = ( props ) => {
    return (
        <header>
            <Logo height="88%" />
            <div className={classes.title}>The Burger Builder - <span className={classes.text}>A React.js Showcase</span></div>
            <nav className={classes.desktopOnly}>
                <NavItems />
            </nav>
            <div className={classes.menuBtn + ' ' + classes.mobileOnly} onClick={props.clicked}>≡</div>
        </header>
    )
}

export default toolBar;