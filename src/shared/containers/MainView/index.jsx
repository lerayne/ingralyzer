/**
 * Created by M. Yegorov on 2017-04-04.
 */
import React, {Component} from "react";
import url from "url";
import {clientID, mainURL} from "../../../../config";
import fetchJsonp from "fetch-jsonp";

function LoginPage(){
    return <div>
        <a href={`https://api.instagram.com/oauth/authorize/?client_id=${clientID}&redirect_uri=${encodeURIComponent(mainURL+'/auth')}&response_type=code&-client`}>Login</a>
    </div>
}

export default class MainView extends Component {

    componentDidMount(){
        window.callbackFunction = function(data){
            console.log('JSONP', data)
        }
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

    async requestSubscriptions(token){

        const resp = await fetchJsonp('https://api.instagram.com/v1/users/self?access_token=' + token)
        const json = await resp.json()
        console.log('JSONP', json)

    }
}
