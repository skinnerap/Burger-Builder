import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = ( props ) => {

    const ingredientList = Object.keys( props.ingredients ).map( igKey => {
        return (
            <li key={igKey}>
                <span>
                    {igKey === 'bread-top' ? 'Top Bun' : igKey === 'bread-bottom' ? 'Bottom Bun' : igKey === 'salad' ? 'Lettuce' : igKey}
                </span>
                : {props.ingredients[igKey] === 0 ? 'None' : 'x' + props.ingredients[igKey]}
            </li>
        )
    })

    return (
        <Aux>
            <h3>This burger is looking delicious</h3>
            <ul>
                {ingredientList}
            </ul>
            <p>Price: ${props.price.toFixed(2)}</p>
            <Button
                btnType="Success"
                clicked={props.itemAdded}>Add Item</Button>
            <Button
                btnType="Danger"
                clicked={props.itemCanceled}>Cancel Item</Button>
        </Aux>
    )

}

export default orderSummary;