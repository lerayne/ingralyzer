import "babel-polyfill";
import "isomorphic-fetch";
import React from "react";
import {render} from "react-dom";
import {browserHistory, Router} from "react-router";
import {Provider} from "react-redux";
import Routes from "./shared/Routes";
//local
import configureStore from "./shared/configureStore";

//import MainView from './shared/containers/MainView'

const initialState = window.REDUX_INITIAL_STATE || {}
const store = configureStore(initialState)

document.addEventListener('DOMContentLoaded', () => {
    render(
        <Provider store={store}>
            <Router history={browserHistory}>
                {Routes(store)}
            </Router>
        </Provider>,
        document.getElementById('react-view')
    )
})
