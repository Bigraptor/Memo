import * as types from "../actions/account/ActionTypes.js";
import update from "react-addons-update";

const initialState = {
    register : {
        status : "INIT",
        error : -1
    },
    login : {
        status : "INIT",
        error : -1
    },
    status : {
        valid : false,
        isLoggedin : false,
        nickname : ""
    }
};

export default function join(state = initialState, action){

    switch (action.type){
        case types.JOIN :
            return update(state, {
                register : {
                    status : {$set : "WAIT"}
                }
            })

        case types.JOIN_SUCCESS :
            return update(state, {
                register : {
                    status : {$set : "SUCCESS"}
                }
            });

        case types.JOIN_FAILED :
            return update(state, {
                register : {
                    status : {$set : "FAILED"},
                    error : {$set : action.error}
                }
            });

        case types.LOGIN :
            return update(state, {
                login : {
                    status : {$set : "WAIT"}
                }
            });

        case types.LOGIN_SUCCESS :
            return update(state, {
                login : {
                    status : {$set : "SUCCESS"}
                },
                status : {
                    isLoggedin : {$set : true},
                    nickname : {$set : action.nickname}
                }
            });

        case types.LOGIN_FAILED :
            return update(state, {
                login : {
                    status : {$set : "FAILED"},
                    error : {$set : action.error}
                }
            })

        case types.GET_STATUS :
            return update(state, {
                status : {
                    isLoggedin : {$set : true}
                }
            });

        case types.GET_STATUS_SUCCESS :
            return update(state, {
                status : {
                    valid : {$set : true},
                    nickname : {$set : action.nickname}
                }
            });

        case types.GET_STATUS_FAILED :
            return update(state, {
                status : {
                    valid : {$set : false},
                    isLoggedin : {$set : false}
                }
            });
        
        case types.LOGOUT :
            return update(state, {
                login : {
                    status : {$set : "INIT"}
                },
                status : {
                    valid : {$set : false},
                    isLoggedin : {$set : false},
                    nickname : {$set : ""}
                }
            })

        default :
            return state;
    }
}