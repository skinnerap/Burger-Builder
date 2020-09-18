import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';

const withErrorHandler = ( WrappedComponent, axios ) => {

    return class extends Component {

        state = {
            error: null
        }

        baseErrorMsg ='Bummer dude, it looks like something went wrong: ';

        componentWillMount() {

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });

            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            
        }

        componentWillUnmount = () => {

            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);

        }

        resetErrorHandler = () => {

            this.setState({error: null});

        }

        render() {
            
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        clicked={this.resetErrorHandler}>
                        {this.state.error ? 
                            this.baseErrorMsg +
                            this.state.error.message : 
                            null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )

        }

    }

}

export default withErrorHandler;