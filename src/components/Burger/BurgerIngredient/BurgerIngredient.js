import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngredient.module.css';

class BurgerIngredient extends Component {
    render () {

        let ingredient = null;

        switch( this.props.type ) {
            case('abread-top'):
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case('fbread-bottom'):
                ingredient = (
                    <div className={classes.BreadBottom}></div>
                );
                break;
            case('emeat'):
                ingredient = (
                    <div className={classes.Meat}></div>
                );
                break;
            case('bsalad'):
                ingredient = (
                    <div className={classes.Salad}></div>
                );
                break;
            case('cbacon'):
                ingredient = (
                    <div className={classes.Bacon}></div>
                );
                break;
            case('dcheese'):
                ingredient = (
                    <div className={classes.Cheese}></div>
                );
                break;
            default: 
                ingredient = null;
        }

        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;