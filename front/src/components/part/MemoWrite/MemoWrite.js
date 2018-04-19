import React, { Component } from "react";
import styles from "./MemoWrite.scss";
import classNames from "classnames/bind";
import { memoPostRequest } from "../../actions/memo";
import { connect } from "react-redux";

const Materialize = window.Materialize;
const cx = classNames.bind(styles);

class MemoWrite extends Component{

    constructor(props){
        super(props);
        this.state={
            content : ""
        };

        this._change = this._change.bind(this);
        this._handlepost = this._handlepost.bind(this);
    };

    _change(e){
        let a = {};
        a[e.target.name] = e.target.value;
        this.setState(a);
    }

    _handlepost(){
        return this.props.memoPostRequest(this.state.content).then(
            () => {
                if(this.props.post.status === "SUCCESS"){
                    Materialize.toast("글을 성공적으로 등록하였습니다.", 2000);
                    this.setState({
                        content : ""
                    });
                } else{
                    let error = [
                        "로그인 해주세요.",
                        "글의 내용을 작성해주세요.",
                        "글의 내용을 입력해주세요"
                    ];
                    Materialize.toast(error[this.props.post.error - 1], 2000);
                }
            }
        );
    }

    render(){
        return(
            <div className = {cx("write-wrapper")}>
                    <div className= {cx("card-content")}>
                        <textarea className="materialize-textarea" 
                                placeholder="Write down your memo" 
                                value = {this.state.content}
                                name = "content"
                                onChange = {this._change}></textarea>
                    </div>
                    <div className= {cx("card-action")}>
                        <a className = {cx("card-post")} onClick = {this._handlepost}>POST</a>
                    </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        post : state.memo.post
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        memoPostRequest : (contents) => {
            return dispatch(memoPostRequest(contents));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemoWrite);