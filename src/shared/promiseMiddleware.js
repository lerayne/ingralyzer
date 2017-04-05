/**
 * Created by lerayne on 17.01.17.
 */

export default function promiseMiddleware({getState, dispatch}) {
    return next => action => {
        if (!action.promise) {
            return next(action)
        } else {
            const {type, promise, ...rest} = action

            next(action)

            return promise.then(
                result => {
                    next({
                        ...rest,
                        payload: result,
                        type: type + '_SUCCESS'
                    })

                    return true
                },
                error => {
                    console.error(error)
                    next({
                        ...rest,
                        payload: error,
                        type: type + '_FAILURE'
                    })

                    return false
                }
            )
        }
    }
}