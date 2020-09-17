import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../Backdrop/Backdrop';
import Aux from '../../../../hoc/Auxiliary';

const sideDrawer = ( props ) => {

    let classList = [classes.SideDrawer, classes.Close]

    if( props.open ) {

        classList = [classes.SideDrawer, classes.Open];

    } 

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={classList.join(' ')}>
                <Logo height="11%" />
                <nav>
                    <NavItems />
                </nav>
            </div>
        </Aux>
    )

}

export default sideDrawer;