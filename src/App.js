import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/Layouts/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Cart from './containers/Cart/Cart';
import Orders from './containers/Orders/Orders';

function App() {
  return (  
    <Layout>
        <Route
          path="/"
          exact
          component={BurgerBuilder} />
        <Route
          path="/cart"
          component={Cart} />
        <Route
          path="/orders"
          component={Orders} />
    </Layout> 
  );
}

export default App;
