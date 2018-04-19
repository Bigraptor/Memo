import * as types from "../actions/memo/ActionTypes.js";
import update from "react-addons-update";

const initialState = {
    post : {
        status : "INIT",
        error : -1
    },
    list : {
        data : [],
        isLast : false
    }
};

export default function memo(state = initialState, action){
    switch(action.type){
        case (types.MEMO_POST) :
            return update(state, {
                post : {
                    status : {$set : "WAIT"},
                    error : {$set : -1}
                }
            });

        case (types.MEMO_POST_SUCCESS) :
            return update(state, {
                post : {
                    status : {$set : "SUCCESS"}
                }
            });

        case (types.MEMO_POST_FAILED) :
            return update(state, {
                post : {
                    status : {$set : "FAILED"},
                    error : {$set : action.error}
                }
            });

        case (types.MEMO_GET) :
            return update(state, {
                list : {
                    data : {$set: action.data},
                    isLast : {$set : action.data.length < 6}
                }
            });

        default :
            return state;
    }
}