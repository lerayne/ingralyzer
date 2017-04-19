/**
 * Created by lerayne on 19.04.17.
 */

import {apiGet} from '../helpers/api'

export function getMyProps(){
    return async (dispatch, getState) => {
        const {user} = getState()

        const resp = await apiGet(user, '/users/self')

        if (resp.meta && resp.meta.code === 200){
            dispatch(setMyProps(resp.data))
        }
    }
}

function setMyProps(user){
    console.log('setMyProps', user)
    return {
        type: 'SET_PROPS',
        payload: user
    }
}