import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import Aux from '../../hoc/Auxiliary';

class Cart extends Component {

    state = {
        ingredients: null,
        totalPrice: 2
    }

    componentWillMount = () => {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = null;
        // This loop is used to destructure the query into an object
        for(let param of query.entries()){
            if(param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
            
        }
        
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    continueCheckoutHandler = () => {
        this.props.history.replace('/cart/contact-data');
    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    render() {

        console.log(this.showSummary);
        
        return (
            <Aux>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    continueCheckout={this.continueCheckoutHandler}
                    cancelCheckout={this.cancelCheckoutHandler}
                />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={( props ) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
            </Aux>
        )
    }

}

export default Cart;