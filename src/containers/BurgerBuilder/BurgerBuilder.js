import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

//Global Price List for All Ingredients
//Note: this data could be fetched from an API
const INGREDIENT_PRICES = {
    "bread-top": .25,
    "bread-bottom": .25,
    meat: 2,
    cheese: .5,
    bacon: .75,
    salad: .5
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            "bread-top": 1,
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
            "bread-bottom": 1
        },
        totalPrice: 2,
        purchaseable: false,
        purchasing: false,
        cart: []
    }

    addItemToCart = ( item ) => {

        alert('Item is added to your cart!');

    }

    purchaseHandler = () => {

        this.setState( {purchasing: true} )

    }

    cancelPurchaseHandler = () => {

        this.setState( {purchasing: false} )

    }

    updatePurchaseable( ingredients ) {

        // Convert ingredients (type: Object) into and Array
        // Map the values into a new Array
        // Summate the mapped Array
        const quantity = Object.keys( ingredients ).map( igKey => {
            return ingredients[igKey];
        }).reduce( (total, el) => {
            return total + el;
        }, 0);

        this.setState({ purchaseable: quantity >= 1 });

    }

    addIngredientHandler = ( type ) => {

        //Update the ingredients quantity
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1; // More button increments by 1 at a time
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;

        //Update the total price
        const oldPrice = this.state.totalPrice;
        const priceToAdd = INGREDIENT_PRICES[type];
        const newPrice = oldPrice + priceToAdd;

        this.setState({
            ingredients: updatedIngredients, 
            totalPrice: newPrice
        });

        //Check if user can purchase
        this.updatePurchaseable( updatedIngredients );


    }

    removeIngredientHandler = ( type ) => {

        //Update the ingredients quantity
        const oldCount = this.state.ingredients[type];

        //Check if quantity of type is 0, if so just return
        if(oldCount === 0) {
            return;
        }

        const newCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;

        //Update the total price
        const oldPrice = this.state.totalPrice;
        const priceToSubtract = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - priceToSubtract;

        this.setState({
            ingredients: updatedIngredients, 
            totalPrice: newPrice
        });

        //Check if user can purchase
        this.updatePurchaseable( updatedIngredients );

    }

    render() {

        //Copy of ingredients
        const disabledChoice = {
            ...this.state.ingredients
        }

        //Maps values of copied ingredients object into boolean values
        //True represents that this button should be disabled
        //False represents that this button should not be disabled
        for( let key in disabledChoice ) {
            disabledChoice[key] = disabledChoice[key] <= 0;
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.cancelPurchaseHandler}>
                    <OrderSummary 
                        itemAdded={this.addItemToCart}
                        itemCanceled={this.cancelPurchaseHandler}
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice} />
                </Modal>
                <Burger 
                    ingredients={this.state.ingredients} 
                />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledChoice}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }

}

export default BurgerBuilder;