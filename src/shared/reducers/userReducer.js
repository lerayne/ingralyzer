/**
 * Created by M. Yegorov on 2017-04-05.
 */

export const initialUserState = {
    id:-1,
    accessToken: '',
    bio:'',
    fullName:'ANONYMOUS',
    profilePicture:'',
    userName:'anonymous',
    followedBy:0,
    follows:0,
    media:0
}

export default function followsReducer(state=initialUserState, {type, payload}){
    switch (type){

        case 'SET_USER':
            return {
                ...state,
                accessToken: payload.accessToken
            }

        case 'SET_PROPS':
            return {
                ...state,
                id: payload.id,
                fullName: payload.full_name,
                profilePicture: payload.profile_picture,
                userName: payload.username,
                followedBy: payload.counts.followed_by,
                follows: payload.counts.follows,
                media: payload.counts.media
            }

        default:
            return state
    }
}
