/**
 * Created by M. Yegorov on 2017-04-04.
 */

import express from 'express'

// создаем центральный апп
const app = express()

app.use(express.static('public'))

const PORT = process.env.LISTEN || 3002

//запускаем сервер
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})
