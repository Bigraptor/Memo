import React, {Component} from "react";
import styles from "./Menu.scss";
import classNames from "classnames/bind";
import { showloginrequest } from "../../actions/showlogin/index.js";
import { statusrequest, logoutrequest } from "../../actions/account/index.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Materialize = window.Materialize;
const cx = classNames.bind(styles);

class Menu extends Component{

    constructor(props){
        super(props);

        this.handleshowlogin = this.handleshowlogin.bind(this);
        this.handlelogout = this.handlelogout.bind(this);
    };

    componentDidMount(){

        let logindata = document.cookie;
        if(typeof logindata === "undefined"){
            return;
        }

        logindata = JSON.parse(logindata);

        if(!logindata.isLoggedin){
            return;
        }

        this.props.statusrequest().then(
            () => {
                if(!this.props.valid){
                    logindata = {
                        isLoggedin : false,
                        nickname : ""
                    };
                document.cookie = JSON.stringify(logindata);
                }
            }
        )
    };

    handleshowlogin(){
        this.props.showloginrequest();
    };

    handlelogout(){
        this.props.logoutrequest().then(
            () => {

                let data = JSON.parse(document.cookie);
                data = {
                    isLoggedin : false,
                    nickname : ""
                };
                document.cookie = JSON.stringify(data);

                if(this.props.isLoggedin === false){
                    Materialize.toast("로그아웃 되었습니다.",2000);
                }
            }
        )
    };

    render(){
        
        const notlogin = (
            <div className = {cx("menu-wrapper")}>
                <div className = {cx("menu-login")}
                    onClick = {this.handleshowlogin}>
                    로그인
                </div>
            </div>
        );

        const login = (
            <div className = {cx("login-wrapper")}>
                <div className = {cx("session")}>
                    {this.props.nickname}님 안녕하세요.
                </div> 
                <span className = {cx("logout")}
                    onClick = {this.handlelogout}>
                    로그아웃
                </span>
            </div>
        );

        return(
            <div className = {cx("menu")}>
                {this.props.isLoggedin? login : notlogin}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status : state.showlogin.show,
        //// 밑에는 세션확인용
        isLoggedin : state.join.status.isLoggedin,
        valid : state.join.status.valid,
        nickname : state.join.status.nickname
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showloginrequest : () => {
            return dispatch(showloginrequest());
        },

        statusrequest : () => {
            return dispatch(statusrequest());
        },

        logoutrequest : () => {
            return dispatch(logoutrequest());
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));