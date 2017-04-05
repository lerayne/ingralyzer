/**
 * Created by M. Yegorov on 2017-04-04.
 */
import "babel-polyfill";
import express from "express";
import url from "url";
import {getIGAuth} from "./server/secutity/auth";
import {mainURL} from "config";

// создаем центральный апп
const app = express()

app.get('/auth', async(req, res) => {

    const reqURL = url.parse(req.url, true)

    if (reqURL.query && reqURL.query.code) {

        const response = await getIGAuth(reqURL.query.code)

        if (response.access_token) {
            res.redirect(302, mainURL + '/?token=' + response.access_token)
        } else {
            res.end(response)
        }
    } else {
        res.end('missing "code" URL param')
    }
})

//app.get(/^(?!\/api\/).*$/, express.static('public'))
app.use('*', express.static('public'))

const PORT = process.env.LISTEN || 3002

//запускаем сервер
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})
