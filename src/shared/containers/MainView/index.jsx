/**
 * Created by M. Yegorov on 2017-04-04.
 */

import React, {Component} from 'react'
import {clientID, mainURL} from '../../../../config'

function LoginPage(){
    return <div>
        <a href={`https://api.instagram.com/oauth/authorize/?client_id=${clientID}&redirect_uri=${encodeURIComponent(mainURL+'/auth')}&response_type=code`}>Login</a>
    </div>
}

export default class MainView extends Component {

    componentDidMount(){

    }

    render(){
        return <LoginPage />
    }
}
