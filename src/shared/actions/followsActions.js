/**
 * Created by lerayne on 19.04.17.
 */

import {apiGet} from '../helpers/api'

export function getFollows(){
    return async (dispatch, getState) => {
        const {user} = getState()
        const json = await apiGet(user, '/users/self/follows')
        console.log('getFollows', json)
    }
}
