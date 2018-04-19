import * as types from "./ActionTypes.js";
import axios from "axios";

export function memoPostRequest(contents){
    return (dispatch) => {
        dispatch(memoPost());

        return axios.post("/blog", {contents})
        .then( (response) => {
            dispatch(memoPostSuccess());
        }).catch( (error) => {
            dispatch(memoPostFailed(error.response.data.code));
        });
    };
};

export function memoGetRequest(isInitial, listType, id, nickname){
    return (dispatch) => {

        let url = "/blog";

        if(typeof nickname === "undefined"){
            url = isInitial ? url : `${url}/${listType}/${id}`;
        } else{

        }

        return axios.get(url).then(
            (response) => {
                dispatch(memoGet(response.data, isInitial, listType));
            }
        )
    }
}

export function memoPost(){
    return {
        type : types.MEMO_POST
    };
};

export function memoPostSuccess(){
    return {
        type : types.MEMO_POST_SUCCESS
    };
};

export function memoPostFailed(error){
    return {
        type : types.MEMO_POST_FAILED,
        error
    };
};

export function memoGet(data, isInitial, listType){
    return {
        type : types.MEMO_GET,
        data,
        isInitial,
        listType
    };
};