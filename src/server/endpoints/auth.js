/**
 * Created by lerayne on 06.04.17.
 */
import url from "url";
import https from 'https'
import qs from 'querystring'
import ms from 'ms'
import {clientID, clientSecret, mainURL} from 'config'
import {query} from '../db'

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

export async function grantAccess(IGAuthRes){

    // is there such user already
    const dbResp = await query('SELECT * FROM users WHERE ig_id = ?', [IGAuthRes.user.id])

    // user already in the db
    if (dbResp.length) {
        const user = dbResp[0]

        if (user.access_token !== IGAuthRes.access_token) {
            const updateResp = await query(
                `UPDATE users SET ? WHERE ig_id = ?`,
                [{access_token: IGAuthRes.access_token}, IGAuthRes.user.id]
            )

            if (updateResp.affectedRows) return user
            else return false

        }
        return user

    } else {
        const newUser = {
            ig_id: IGAuthRes.user.id,
            access_token: IGAuthRes.access_token
        }

        const createUserResp = await query(`
            INSERT INTO users (??) VALUES (?) 
        `, [Object.keys(newUser), Object.values(newUser)])

        if (createUserResp.affectedRows) return newUser
        else return false
    }
}

const loginErrLocal = 'IG server responded. Local service error.'
const loginErrDenied = 'Authentication denied by user'
const loginErrCode = 'Missing the "code" param in oauth server response'

function returnError(res, message){
    res.redirect(302, mainURL + '/login?error=' + encodeURIComponent(message))
}

export default async function auth (req, res) {

    const reqURL = url.parse(req.url, true)

    if (reqURL.query && reqURL.query.code) {

        const IGAuthRes = await getIGAuth(reqURL.query.code)

        if (IGAuthRes.access_token) {

            const user = await grantAccess(IGAuthRes)

            if (user) {

                const mainURLObj = url.parse(mainURL)

                res.cookie('access_token', user.access_token, {
                    path: '/',
                    domain: mainURLObj.hostname,
                    maxAge: ms('7 days')
                })
                res.redirect(302, mainURL)
            } else {
                returnError(res, loginErrLocal)
            }
        } else {
            returnError(res, loginErrDenied)
        }
    } else {
        returnError(res, loginErrCode)
    }
}