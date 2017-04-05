/**
 * Created by M. Yegorov on 2017-04-05.
 */
import {combineReducers} from "redux";
import follows from "./followsReducer";
import user from "./userReducer";

export default combineReducers({
    follows,
    user
})
