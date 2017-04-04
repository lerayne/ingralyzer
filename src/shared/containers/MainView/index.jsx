/**
 * Created by M. Yegorov on 2017-04-04.
 */

import React, {Component} from 'react'
import url from 'url'
import {clientID, mainURL} from '../../../../config'

function LoginPage(){
    return <div>
        <a href={`https://api.instagram.com/oauth/authorize/?client_id=${clientID}&redirect_uri=${encodeURIComponent(mainURL+'/auth')}&response_type=code&scope=follower_list`}>Login</a>
    </div>
}

export default class MainView extends Component {

    componentDidMount(){

    }

    render(){

        const loc = url.parse(url.format(window.location), true)

        if (loc.query.token) {
            return <div>
                <button onClick={() => this.requestSubscriptions(loc.query.token)}>Subs</button>
                <div>

                </div>
            </div>
        } else {
            return <LoginPage />
        }
    }

    requestSubscriptions(token){
        fetch('https://api.instagram.com/v1/users/self/follows?access_token=' + token, {
            mode:'no-cors'
        }).then(resp => resp.json()).then(json => console.log(json))
    }
}
