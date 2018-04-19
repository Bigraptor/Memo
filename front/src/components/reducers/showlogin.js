import * as types from "../actions/showlogin/ActionTypes.js";
import update from "react-addons-update";

const initialState = {
    show : false
};

export default function showlogin(state = initialState, action){
    
    switch(action.type){
        case types.SHOW_LOGINMODAL:
            return update(state, {
                show : {$set: true}
            });
        
        case types.HIDE_LOGINMODAL:
            return update(state, {
                show : {$set : false}
            });

        default :
            return state
    }
};