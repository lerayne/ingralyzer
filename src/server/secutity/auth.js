/**
 * Created by M. Yegorov on 2017-04-04.
 */

import https from 'https'
import qs from 'querystring'
import {clientID, clientSecret, mainURL} from 'config'

export function getIGAuth(code){
    const post_data = qs.stringify({
        client_id: clientID,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: mainURL + '/auth'
    })

    return new Promise((resolve, reject) => {
        const post_req = https.request({
            hostname: 'api.instagram.com',
            port: 443,
            path: '/oauth/access_token',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(post_data)
            }
        }, postRes => {
            let str = ''
            //console.log('statusCode:', postRes.statusCode);
            //console.log('headers', postRes.headers)
            postRes.on('data', chunk => {str += chunk})
            postRes.on('end', () => {
                try {
                    const json = JSON.parse(str)
                    resolve(json)
                } catch(error) {
                    resolve({error})
                }
            });
        })

        post_req.on('error', error => {
            resolve({error})
        });

        post_req.write(post_data);
        post_req.end();
    })
}