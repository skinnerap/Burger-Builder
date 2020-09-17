import React from 'react'
import classes from './Logo.module.css';
import logoImage from '../../assets/imgs/burger-logo.png';

const logo = ( props ) => {

    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={logoImage} alt="Burger Builder" />
        </div>
    )

}

export default logo;