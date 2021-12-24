import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Caclulated } from './components/Caclulated';

import './custom.css'

export const App = () => {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/calculated' component={Caclulated} />
      </Layout>
    );
}
export default App;