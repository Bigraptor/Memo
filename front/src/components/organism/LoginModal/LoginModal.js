import React, { Component } from "react";
import styles from "./LoginModal.scss";
import classNames from "classnames/bind";
import { ScreenMask } from "../../part/ScreenMask";
import { connect } from "react-redux";
import { hideloginrequest } from "../../actions/showlogin";
import { joinrequest, loginrequest } from "../../actions/account";
import { withRouter } from "react-router-dom";

const Materialize = window.Materialize;
const cx = classNames.bind(styles);

class LoginModal extends Component{

    constructor(props){
        super(props); 
        this.state = {
            id : "",
            password : "",
            nickname : "",
            showregi : false
        };

        this._change = this._change.bind(this);
        this._hide = this._hide.bind(this);
        this._register = this._register.bind(this);
        this.handlejoin = this.handlejoin.bind(this);
        this.handlelogin = this.handlelogin.bind(this);
    };
    
    _change(e){
        let a = {};
        a[e.target.name] = e.target.value;
        this.setState(a);
    }

    _hide(){
        this.props.hideloginrequest();
    }

    _register(){
        this.setState({
            ...this.state,
            showregi : true
        })
    }

    handlejoin(){

        return this.props.joinrequest(this.state.id, this.state.password, this.state.nickname).then( () => {
            if(this.props.join === "SUCCESS"){
                Materialize.toast(this.state.id + '님, 저희 가족이 되신 것을 환영합니다!', 2000);
                this.setState({
                    id : "",
                    password : "",
                    nickname : "",
                    showregi : false
                })}
            else{
                let errormessage = [
                    "잘못된 아이디 형식입니다.",
                    "패스워드 길이가 올바르지 않습니다.",
                    "이미 존재하는 아이디입니다.",
                    "이미 존재하는 닉네임입니다."
                ];
                Materialize.toast(errormessage[this.props.errorcode - 1],1000);
            }
            
        })
    }

    handlelogin(){
        return this.props.loginrequest(this.state.id, this.state.password).then(
            () => {
                if(this.props.loginstatus === "SUCCESS"){

                    let nick = this.props.nickname;

                    let logindata = {
                        isLoggedin : true,
                        nickname : nick
                    };
                    document.cookie = JSON.stringify(logindata);
                    Materialize.toast("로그인 성공", 1000);
                    this._hide();
                }
                else{
                    let errormessage = [
                        "패스워드는 문자열이여야 합니다.",
                        "아이디가 존재하지 않습니다.",
                        "패스워드가 틀렸습니다."
                    ]
                    Materialize.toast(errormessage[this.props.loginerror-4], 2000);
                }
            }
        )
    }

    render(){

        const login = (
        <div>
            <div className = {cx("exit")}>
                <a className="btn-floating btn-tiny waves-effect waves-light blue"
                onClick = {this._hide}>
                <i className="material-icons">cancel</i>
                </a>
            </div>
            <div className = {cx("intro")}>
                Hello!
            </div>
            <div className = "row">
                <div className = "input-field col s12">
                    <input type="text" 
                    name = "id"
                    className ="validate"
                    value = {this.state.id}
                    onChange = {this._change}/>
                    <label>아이디</label>
                </div>
                <div className = "input-field col s12">
                    <input type="password" 
                    name = "password"
                    className ="validate"
                    value = {this.state.password}
                    onChange = {this._change}/>
                    <label>비밀번호</label>
                </div>
            </div>
            <div className = {cx("login-button")} onClick = {this.handlelogin}>
                <a className="waves-effect waves-light btn"><i className="material-icons left">vpn_key</i>로그인</a>
            </div>
            <div className = {cx("create-here")}>
                Do you want to be my family? <span className = {cx("account")} onClick = {this._register}>Click here!</span>
            </div>
        </div>
    );

    const register = (
        <div>
            <div className = {cx("exit")}>
                <a className="btn-floating btn-tiny waves-effect waves-light blue"
                onClick = {this._hide}>
                <i className="material-icons">cancel</i>
                </a>
            </div>
            <div className = {cx("intro")}>
                Shall We?
            </div>
            <div className = "row">
                <div className = "input-field col s12">
                    <input type="text" 
                    name = "id"
                    className ="validate"
                    value = {this.state.id}
                    onChange = {this._change}/>
                    <label>아이디</label>
                </div>
                <div className = "input-field col s12">
                    <input type="password" 
                    name = "password"
                    className ="validate"
                    value = {this.state.password}
                    onChange = {this._change}/>
                    <label>비밀번호</label>
                </div>
                <div className = "input-field col s12">
                    <input type="text" 
                    name = "nickname"
                    className ="validate"
                    value = {this.state.nickname}
                    onChange = {this._change}/>
                    <label>닉네임</label>
                </div>
            </div>
            <div className = {cx("login-button")} onClick = {this.handlejoin}>
                <a className="waves-effect waves-light btn"><i className="material-icons left">check</i>회원가입</a>
            </div>
        </div>
    );

        return(
            <div className = {cx("wrapper")}>
                <ScreenMask>
                    {this.state.showregi ? register : login}
                </ScreenMask>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status : state.showlogin.show,
        /// 회원가입///
        join : state.join.register.status,
        errorcode : state.join.register.error,
        /// 로그인///
        loginstatus : state.join.login.status,
        nickname : state.join.status.nickname,
        loginerror : state.join.login.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        hideloginrequest : () => {
            return dispatch(hideloginrequest());
        },

        joinrequest : (id, pw, nickname) => {
            return dispatch(joinrequest(id, pw, nickname));
        },

        loginrequest : (id, pw) => {
            return dispatch(loginrequest(id,pw));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginModal));