import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Bun Top', type: 'abread-top'},
    { label: 'Bun Bottom', type: 'fbread-bottom'},
    { label: 'Beef Patty', type: 'emeat'},
    { label: 'Cheese', type: 'dcheese'},
    { label: 'Bacon', type: 'cbacon'},
    { label: 'Lettuce', type: 'bsalad'},
    
];


const buildControls = ( props ) => {

    return (
        <div className={classes.BuildControls}>
            <p className={classes.Price}>Price: $<strong>{props.price.toFixed(2)}</strong></p>
            {controls.map( ctrl => {
                return <BuildControl 
                            key={ctrl.label} 
                            label={ctrl.label}
                            added={() => props.ingredientAdded(ctrl.type)}
                            removed={() => props.ingredientRemoved(ctrl.type)}
                            disabled={props.disabled[ctrl.type]}
                        />
            })}
            <button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.ordered}>Add to Order</button>
        </div>
    )

}

export default buildControls;