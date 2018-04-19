import * as types from "./ActionTypes.js";
import axios from "axios";

export function joinrequest(id, password, nickname){
    return (dispatch) => {
        dispatch(join());

        return axios.post("/account/join", {id, password, nickname}).then(
            (response) => {
                dispatch(joinsuccess());
            }
        ).catch( (error) => {  
            dispatch(joinfailed(error.response.data.code))
        });
    }
};

export function loginrequest(id, password){
    return (dispatch) => {
        dispatch(login());

        return axios.post("/account/login", {id, password}).then(
            (response) => {
                dispatch(loginsuccess(response.data.nickname));
            }
        ).catch( (error) => {
            dispatch(loginfailed(error.response.data.code));
        })
    }
}

export function statusrequest(){
    return (dispatch) => {
        dispatch(status());

        return axios.get("/account/getinfo").then(
            (response) => {
                dispatch(statussuccess(response.data.info.nickname));
            }
        ).catch(
            (error) => {
                dispatch(statusfailed());
            }
        );
    }
};

export function logoutrequest(){
    return (dispatch) => {
        return axios.post("/account/logout").then(
            (response) => {
                dispatch(logout());
            }
        )
    }
};

export function join(){
    return{
        type : types.JOIN
    };
};

export function joinsuccess(){
    return{
        type : types.JOIN_SUCCESS
    };
};

export function joinfailed(error){
    return{
        type : types.JOIN_FAILED,
        error
    };
};

export function login(){
    return {
        type : types.LOGIN
    }
};

export function loginsuccess(nickname){
    return {
        type : types.LOGIN_SUCCESS,
        nickname
    };
};

export function loginfailed(error){
    return {
        type : types.LOGIN_FAILED,
        error
    }
};

export function status(){
    return {
        type : types.GET_STATUS
    };
};

export function statussuccess(nickname){
    return {
        type : types.GET_STATUS_SUCCESS,
        nickname
    };
};

export function statusfailed(){
    return {
        type : types.GET_STATUS_FAILED
    };
};

export function logout(){
    return {
        type : types.LOGOUT
    };
};