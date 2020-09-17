import React from 'react';
import Layout from './components/Layouts/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

function App() {
  return (  
    <Layout>
        <BurgerBuilder />
    </Layout> 
  );
}

export default App;
