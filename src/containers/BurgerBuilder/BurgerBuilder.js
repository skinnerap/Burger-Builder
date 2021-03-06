import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

//Global Price List for All Ingredients
//Note: this data could be fetched from an API
// const INGREDIENT_PRICES = {
//     "bread-top": .25,
//     "bread-bottom": .25,
//     meat: 2,
//     cheese: .5,
//     bacon: .75,
//     salad: .5
// };

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 2,
        purchaseable: false,
        purchasing: false,
        loading: false,
        priceList: {
            "abread-top": null,
            "fbread-bottom": null,
            emeat: null,
            dcheese: null,
            cbacon: null,
            bsalad: null
        }
    }

    componentDidMount = () => {

        axios.get('https://the-burger-builder-df9e4.firebaseio.com/ingredients.json')
            .then(response => {

                // Firebase alphabetizes database entries, thus we need to re-order them
                // into the proper order (eg. Top bun on top, bottom bun on bottom, etc)
                console.log('SPECIAL NOTE: Adding new ingredients? Edit componentDidMount() function as firebase ' +
                            'alphabetizes database entry keys');

                const orderedIngredients = {
                    'abread-top' : response.data['abread-top'],
                    'bsalad' : response.data['bsalad'],
                    'cbacon' : response.data['cbacon'],
                    'dcheese' : response.data['dcheese'],
                    'emeat' : response.data['emeat'],
                    'fbread-bottom' : response.data['fbread-bottom'],
                } 

                this.setState({ingredients: orderedIngredients});

            }).catch(err => console.log(err));

        // Update state priceList from Firebase
        axios.get('https://the-burger-builder-df9e4.firebaseio.com/price.json')
            .then(response => {
                let copy = {...this.state.priceList};
                for(let key in copy) {
                    copy[key] = response.data[key];
                }
                this.setState({priceList: copy});

            }).catch(err => console.log(err));

    }

    addItemToCart = () => {

        let queryParams = [];

        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price=' + this.state.totalPrice);

        queryParams = queryParams.join('&');

        this.props.history.push({
            pathname: '/cart',
            search: '?' + queryParams
        });

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
        const priceToAdd = this.state.priceList[type];
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
        const priceToSubtract = this.state.priceList[type];
        console.log('price to subtract: ' + priceToSubtract);
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

        let orderSummary = null;

        let burger = <Spinner style={{'margin-top': '50v'}}/>

        if(this.state.ingredients) {

            burger =(
                <Aux>
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
                </Aux>);

            orderSummary = 
                <OrderSummary 
                    itemAdded={this.addItemToCart}
                    itemCanceled={this.cancelPurchaseHandler}
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice} />;

            if(this.state.loading) {
                orderSummary = <Spinner />;
            }

        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}

export default withErrorHandler(BurgerBuilder, axios);