import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';

const withErrorHandler = ( WrappedComponent, axios ) => {

    return class extends Component {

        baseErrorMsg ='Bummer dude, it looks like something went wrong: ';

        state = {
            error: null
        }

        componentDidMount() {

            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });

            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

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