/**
 * Created by M. Yegorov on 2017-04-05.
 */
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/_root";
import promiseMiddleware from "./promiseMiddleware";

export default function configureStore(initialState = {}) {

    let enhancer
    const middlewares = applyMiddleware(thunk, promiseMiddleware)

    /*if (process.env.NODE_ENV === 'development'){

        const DevTools = require('../client/components/DevTools/index').default

        enhancer = compose(
            middlewares,
            DevTools.instrument()
        )
    } else {*/
        enhancer = middlewares
    //}

    const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
        module.hot.accept('./reducers/_root', () =>
            store.replaceReducer(require('./reducers/_root').default)
        );
    }

    return store;
}
