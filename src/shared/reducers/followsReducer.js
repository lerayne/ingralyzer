/**
 * Created by M. Yegorov on 2017-04-05.
 */

export const initialFollowsStore = {
    list: [],
    loaded: false
}

export default function followsReducer(store=initialFollowsStore, {type, payload}){
    switch (type){
        default:
            return store
    }
}
