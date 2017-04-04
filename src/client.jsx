/**
 * Created by M. Yegorov on 2017-04-04.
 */

import 'babel-polyfill'
import React      from 'react'
import ReactDOM   from 'react-dom'

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <div className="root">test</div>,

        document.getElementById('react-view')
    )
})
