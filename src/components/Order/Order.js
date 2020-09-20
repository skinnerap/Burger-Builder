import React from 'react';
import classes from './Order.module.css';
import Burger from '../Burger/Burger';

const Order = ( props ) => {

    const ingredients = [];

    for(let igName in props.ingredients) {
        ingredients.push({
            name: igName,
            amount: props.ingredients[igName]
        })
    }

    let reorderedIngredients = new Array(6);
    reorderedIngredients[0] = ingredients[2];
    reorderedIngredients[1] = ingredients[5];
    reorderedIngredients[2] = ingredients[0];
    reorderedIngredients[3] = ingredients[3];
    reorderedIngredients[4] = ingredients[4];
    reorderedIngredients[5] = ingredients[1];

    const transformedIngredients = ingredients.map(ig => {
        let transformedName = null;
        
        if(ig.name === 'bsalad') {
            transformedName = 'Lettuce';
        } else if(ig.name === 'fbread-bottom') {
            transformedName = 'Bottom Bun';
        } else if(ig.name === 'abread-top') {
            transformedName = 'Top Bun';
        } else if(ig.name === 'emeat') {
            transformedName = 'Beef Patty'
        } else if(ig.name === 'dcheese') {
            transformedName = 'Cheese';
        } else if(ig.name === 'cbacon') {
            transformedName = 'Bacon';
        }

        return <span className={classes.Ingredient} key={ig.name}> {transformedName}: {ig.amount} </span>
    })

    return (
        <div className={classes.Order}>
            <Burger
                ingredients={props.ingredients} />
            <p>Ingredients: {transformedIngredients}</p>
            <p>Price: ${props.price}</p>
        </div>
    )
}

export default Order;