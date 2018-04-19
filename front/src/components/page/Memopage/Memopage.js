import React, {Component} from "react";
import styles from "./Memopage.scss";
import classNames from "classnames/bind";
import { Header } from "../../organism/Header";
import { LoginModal } from "../../organism/LoginModal";
import { Memo } from "../../part/Memo";
import { MemoWrite } from "../../part/MemoWrite";
import {showloginrequest, hideloginrequest} from "../../actions/showlogin";
import { memoGetRequest } from "../../actions/memo";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const cx = classNames.bind(styles);

class Memopage extends Component{

    showlogin(){
        this.props.showloginrequest();
    };

    componentDidMount(){
        this.props.memoGetRequest(true).then(
            () => {
                console.log(this.props.list.data, this.props.list.isLast)
            }
        );
    };

    render(){

        const memo = this.props.list.data.map( (a) => { 
            return <Memo key = {a._id}contents = {a.contents} writer = {a.writer} date = {a.date.created}/>
         } )
        
        return (
            <div className = {cx("edge")}>
                <div className = {cx("wrapper")}>
                    <Header />
                    {this.props.show?<LoginModal /> : ""}
                    {this.props.status?
                    <div className = {cx("memo-write")}>
                        <MemoWrite/>
                    </div> : ""}
                    <div className = {cx("memo")}>
                        {memo}
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        show : state.showlogin.show,
        status : state.join.status.isLoggedin,
        list : state.memo.list
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showlogin : () => {
            return dispatch(showloginrequest())
        },

        memoGetRequest : (isInitial, listType, id, nickname) => {
            return dispatch(memoGetRequest(isInitial, listType, id, nickname));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Memopage));