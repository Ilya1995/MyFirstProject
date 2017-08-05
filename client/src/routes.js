import 'babel-polyfill'
import React from 'react'
import App from 'containers/App'
import Home from 'containers/Home'
import NotFound from './components/NotFound'


import {Route, IndexRoute} from 'react-router'

export const routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRoute component={Home}/>
            {/*<Route path='/registration/certs' component={Certs}/>*/}
        </Route>
        <Route path='*' component={NotFound}/>
    </div>
);