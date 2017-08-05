import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router, hashHistory } from 'react-router'
import { routes } from './routes'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes} />
    </Provider>,
    document.getElementById('root')
);