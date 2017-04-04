/**
 * Created by M. Yegorov on 2017-04-04.
 */

import 'babel-polyfill'
import 'isomorphic-fetch'
import React      from 'react'
import {render}   from 'react-dom'

import MainView from './shared/containers/MainView'

document.addEventListener('DOMContentLoaded', () => {
    render(
        <MainView />,
        document.getElementById('react-view')
    )
})
