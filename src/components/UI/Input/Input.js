import React from 'react';
import classes from './Input.module.css'

const input = ( props ) => {

    let inputElement = null;

    let classList = [classes.InputElement];

    if(props.invalid && props.touched) {
        classList.push(classes.Invalid);
    }

    switch(props.elementType) {
        case( 'input' ) :
            inputElement = <input className={classList.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case( 'textArea' ) :
            inputElement = <input className={classList.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        default :
            inputElement = <input className={classList.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
    }

    return (
        <div className={classes.Input}>
            {inputElement}
        </div>
    )

}

export default input;