/**
 * Created by lerayne on 06.04.17.
 */
import url from "url";
import {getIGAuth} from "../secutity/auth";
import {mainURL} from 'config'

export default async function auth (req, res) {

    const reqURL = url.parse(req.url, true)

    if (reqURL.query && reqURL.query.code) {

        const response = await getIGAuth(reqURL.query.code)

        if (response.access_token) {
            res.redirect(302, mainURL + '/?token=' + response.access_token)
        } else {
            res.end(response)
        }
    } else {
        res.redirect(302, mainURL + '/login?error=' + encodeURIComponent('Missing the "code" param in oauth server response'))
    }
}