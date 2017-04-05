/**
 * Created by M. Yegorov on 2017-04-05.
 */
import React, {Component} from "react";
import {Button} from 'antd'
import url from 'url'
//local
import {clientID, mainURL} from "../../../config";
import css from './LoginPage.css'
import igIconWhite from '../images/ig_glyph_white.png'

const loginUrl = url.format({
    protocol:'https:',
    host: 'api.instagram.com',
    pathname: '/oauth/authorize',
    query: {
        client_id: clientID,
        redirect_uri: mainURL+'/auth',
        response_type: 'code'
    }
})

class LoginPage extends Component {

    static anonymousRequired = true

    render() {
        return <div className={css.main}>
            <div className="login-form">

                <a href={loginUrl + '&scope=follower_list+public_content'}>
                    <Button type="primary" size="large">
                        <img src={igIconWhite} />
                        <span>Log in with Instagram</span>
                    </Button>
                </a>

            </div>
        </div>
    }
}

export default LoginPage