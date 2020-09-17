import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../UI/Toolbar/Toolbar';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {

        showSideDrawer: false

    }

    hideSideDrawerHandler = () => {

        this.setState({showSideDrawer: false})

    }

    showSideDrawerHandler = () => {

        this.setState({showSideDrawer: true})

    }

    render() {

        return (
            <Aux>
                <Toolbar  clicked={this.showSideDrawerHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.hideSideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )

    }

}

export default Layout;