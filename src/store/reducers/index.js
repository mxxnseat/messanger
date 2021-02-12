import {combineReducers} from "redux";

import login from "./authorization";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
    messages,
    login,
    errors
});