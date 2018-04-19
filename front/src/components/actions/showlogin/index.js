import * as types from "./ActionTypes.js";

export function showloginrequest(){
    return{
        type: types.SHOW_LOGINMODAL
    }
};

export function hideloginrequest(){
    return{
        type: types.HIDE_LOGINMODAL
    }
};