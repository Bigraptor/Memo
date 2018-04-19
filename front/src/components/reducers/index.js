import showlogin from "./showlogin.js";
import join from "./account.js";
import memo from "./memo.js";
import {combineReducers} from "redux";

const reducers = combineReducers({
    showlogin, join, memo
});

export default reducers;