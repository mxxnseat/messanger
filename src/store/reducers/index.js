import {combineReducers} from "redux";

import login from "./authorization";
import errors from "./errors";

export default combineReducers({
    login,
    errors
});