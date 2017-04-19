/**
 * Created by lerayne on 19.04.17.
 */

import fetchJsonp from 'fetch-jsonp'

export async function apiGet(user, endpoint) {
    const resp = await fetchJsonp(getApiUrl(user, endpoint))
    return await resp.json()
}

export function getApiUrl(user, endpoint){
    return `https://api.instagram.com/v1${endpoint}?access_token=${user.accessToken}`
}