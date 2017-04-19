/**
 * Created by M. Yegorov on 2017-04-04.
 */
import "babel-polyfill";
import express from "express";

import {mainURL} from "config";
import getHTML from './server/getHTML'
import cookieParser from 'cookie-parser'

//local
import authEP from './server/endpoints/auth'

// создаем центральный апп
const app = express()

app.use(cookieParser())

app.get('/auth', authEP)

//app.get(/^(?!\/api\/).*$/, express.static('public'))
app.use('/public', express.static('public'))

app.use('*', (req, res) => {
    res.send(getHTML())
})

const PORT = process.env.LISTEN || 3002

//запускаем сервер
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})
