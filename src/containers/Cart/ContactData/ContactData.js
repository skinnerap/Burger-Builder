import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Modal from '../../../components/UI/Modal/Modal';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'State/Province/Region'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        loading: false,
        modalOpen: true,
        formIsValid: false
    }

    closeModalHandler = () => {
        this.setState({modalOpen: false});
    }

    orderHandler = ( event ) => {
        event.preventDefault();

        const formData = {};

        for(let formDataID in this.state.orderForm) {
            formData[formDataID] = this.state.orderForm[formDataID].value;
        }

        // Display spinner until request is sent
        this.setState({loading: true, modalOpen: true});

        // Store data about the order to send to server
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    inputChangeHandler = ( event, formID) => {

        const orderFormCopy = {...this.state.orderForm};
        const formElementCopy = {...orderFormCopy[formID]}
        formElementCopy.value = event.target.value;
        formElementCopy.valid = this.checkValidity(formElementCopy.value, formElementCopy.validation);
        formElementCopy.touched = true;
        orderFormCopy[formID] = formElementCopy;

        let formValidity = true;
        for(let elt in orderFormCopy) {
            formValidity = orderFormCopy[elt].valid && formValidity;
        }

        this.setState({orderForm: orderFormCopy, formIsValid: formValidity})

    }

    checkValidity = ( value, rules ) => {

        let isValid = false;

        if(rules.required) {
            isValid = value.trim() !== '';
        }

        return isValid;

    }

    render() {

        let formElementArray = [];

        for(let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (<form>
                        {formElementArray.map(formElement => {
                            return <Input 
                                      key={formElement.id}
                                      elementType={formElement.config.elementType}
                                      elementConfig={formElement.config.elementConfig}
                                      value={formElement.config.value}
                                      changed={(event) => this.inputChangeHandler(event, formElement.id)} 
                                      invalid={!formElement.config.valid} 
                                      touched={formElement.config.touched} />
                        })}
                    </form>);

        if(this.state.loading) {
            form = <Spinner />
        }

        return (
            <Modal show={this.state.modalOpen} clicked={this.closeModalHandler}>
            <div className={classes.ContactData}>
                <h4 className={classes.header}>Checkout Details</h4>
                {form}
                <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>Submit Order</Button>
            </div>
            </Modal>
        )
    }

}

export default ContactData;