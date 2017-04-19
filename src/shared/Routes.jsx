/**
 * Created by M. Yegorov on 2017-04-05.
 */
import React from "react";
import url from 'url'
import {IndexRoute, Route} from "react-router";
//local
import RootPage from "./containers/RootPage";
import FollowsPage from "./containers/FollowsPage";
import CategoriesPage from "./containers/CategoriesPage";
import LoginPage from "./containers/LoginPage";

function getRedirectUrl(pathname, prevLocation = false){
    const urlObject = {
        pathname: pathname,
        query: {}
    }

    if (prevLocation){
        urlObject.query.next = prevLocation.pathname + prevLocation.search
    }

    return url.format(urlObject)
}

function redirectionsCheck(globalState, routerState, redirect){
    const {user} = globalState
    const {routes, location} = routerState
    let redirected = false

    routes.forEach(route => {
        const component = route.component.WrappedComponent || route.component

        if (component.loginRequired && user.accessToken === '') {
            redirected = true
            redirect(getRedirectUrl('/login', location))
        }

        if (component.anonymousRequired && user.accessToken !== '') {
            redirected = true
            // todo - подумать о том что случится, если будет переход на страницу "login"
            // не при помощи набора в адрессной строке (тогда будет простой редирект), а
            // при помощи инструментов router'а - видимо нужно перенаправить юзера откуда
            // пришел, а не просто на стартовую страницу
            redirect(getRedirectUrl('/'))
        }
    })

    return redirected
}

function onEnter(store){
    return function (nextRouterState, redirect){
        redirectionsCheck(store.getState(), nextRouterState, redirect)
    }
}

function onChange(store){
    return function(prevRouterState, nextRouterState, redirect){

        // onChange is called under every URL change (including query), we want to omit this.
        // We want only check access if the pathname is changed
        if (prevRouterState.location.pathname !== nextRouterState.location.pathname){
            redirectionsCheck(store.getState(), nextRouterState, redirect)
        }
    }
}

export default function Routes(store) {
    return <Route
        path='/'
        component={RootPage}
        onEnter={onEnter(store)}
        onChange={onChange(store)}
    >
        <IndexRoute component={FollowsPage}/>
        <Route path="categories" component={CategoriesPage}/>
        <Route path="login" component={LoginPage}/>
    </Route>
}
