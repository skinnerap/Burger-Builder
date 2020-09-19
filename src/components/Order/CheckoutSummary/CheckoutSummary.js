import React from 'react';
import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';

const checkoutSummary = ( props ) => {

    return (
        <div className={classes.CheckoutSummary}>
            <h1>You've built a mighty tasty creation!</h1>
            <Burger
                ingredients={props.ingredients} 
            />
            <button 
                className={classes.Button + ' ' + classes.Success}
                onClick={props.continueCheckout}
            >
                Checkout
            </button>
            <button 
                className={classes.Button + ' ' + classes.Danger}
                onClick={props.cancelCheckout}
            >
                Remove Burger
            </button>
        </div>
    )

}

export default checkoutSummary;