import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './Orders.module.css';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount = () => {
        axios.get('orders.json')
            .then(res => {
                let fetchedOrders = [];

                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key});
                }

                console.log(fetchedOrders)
                
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                this.setState({loading: false});
                console.log(err);
            });
    }

    render() {
        return (
            <div className={classes.Orders}>
                <h1 className={classes.Header}>Burger Creations</h1>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                        orderData={order.orderData}
                    />
                ))}
            </div>
        )
    }

}

export default withErrorHandler(Orders, axios);