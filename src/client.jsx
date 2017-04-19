import "babel-polyfill";
import "isomorphic-fetch";
import React from "react";
import {render} from "react-dom";
import {browserHistory, Router} from "react-router";
import {Provider} from "react-redux";
import Cookies from 'js-cookie'
//local
import Routes from "./shared/Routes";
import configureStore from "./shared/configureStore";

const initialState = window.REDUX_INITIAL_STATE || {}

const store = configureStore(initialState)

const access_token = Cookies.get('access_token')

console.log('access_token', access_token)

if (access_token) {
    store.dispatch({
        type:'SET_USER',
        payload:{
            accessToken: access_token
        }
    })
}

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
