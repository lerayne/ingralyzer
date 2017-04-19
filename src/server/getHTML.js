/**
 * Created by lerayne on 11.04.17.
 */

const DEV = process.env.NODE_ENV === 'development'
const assetsPath = DEV ? '//127.0.0.1:8050/public/' : 'public/'
const fonts = '//fonts.googleapis.com/css?family=Roboto|Roboto+Slab:300,400&amp;subset=cyrillic" rel="stylesheet'

export default function getHTML() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Ingralyzer</title>
            <link href="${fonts}">
            <link rel="stylesheet" href="${assetsPath}styles.css" />
            <script src="${assetsPath}bundle.js"></script>
        </head>
        <body>
        <div id="react-view"></div>
        </body>
        </html>
    `
}