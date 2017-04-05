/**
 * Created by M. Yegorov on 2017-04-05.
 */
import React from "react";
import {IndexRoute, Route} from "react-router";
//local
import RootPage from "./containers/RootPage";
import FollowsPage from "./containers/FollowsPage";
import CategoriesPage from "./containers/CategoriesPage";
import LoginPage from "./containers/LoginPage";

export default function Routes(store) {
    return <Route path='/' component={RootPage}>
        <IndexRoute component={FollowsPage}/>
        <Route path="categories" component={CategoriesPage}/>
        <Route path="login" component={LoginPage}/>
    </Route>
}
