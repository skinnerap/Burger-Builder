import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        loading: false,
    }

    orderHandler = ( event ) => {
        event.preventDefault();

        // Display spinner until request is sent
        this.setState({loading: true});

        // Store data about the order to send to server
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                fName: 'Alex',
                lName: 'Skinner',
                address: '3711 Vawter Ave',
                city: 'Richmond',
                state: 'VA',
                zip: '20109',

            }
        }

        // Post request with the order data
        // .json extension on route is a requirement from Firebase
        axios.post('/orders.json', order)
            .then(res => {
                // Reset the state of loading and purchasing
                this.setState({loading: false});
                this.props.history.push('/');
            }).catch(err => {
                // Error handled by state management and shows users a modal with info
                console.log(err)
            });

    }

    render() {

        let form = (<form>
                        <input className={classes.input} type="text" name="name" placeholder="Full Name" required />
                        <input className={classes.input} type="email" name="email" placeholder="Email Address" required />
                        <input className={classes.input} type="text" name="street" placeholder="Street" required />
                        <input className={classes.input} type="city" name="city" placeholder="City" required />
                        <input className={classes.input} type="state" name="state" placeholder="State" required />
                        <input className={classes.input} type="zip" name="zip" placeholder="Zipcode" required />
                    </form>);
        console.log(this.props)

        if(this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4 className={classes.header}>Delivery Address</h4>
                {form}
                <Button btnType="Success" clicked={this.orderHandler}>Submit Order</Button>
                <Button btnType="Danger">Cancel Order</Button>
            </div>
        )
    }

}

export default ContactData;