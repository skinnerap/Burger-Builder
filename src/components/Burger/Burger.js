import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = ( props ) => {

    let transformedIngredients = Object.keys( props.ingredients ).map( igKey => {
        return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    }).reduce( ( prev, current ) => {
        return prev.concat(current);
    }, []);

    if(transformedIngredients.length < 1) {
        transformedIngredients = <p>Time to build your dream burger, yum!</p>
    }

    return (
        <div className={classes.Burger}>
            {transformedIngredients}
        </div>
    )

}

export default burger;