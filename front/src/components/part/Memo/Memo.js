import React, { Component } from "react";
import styles from "./Memo.scss";
import classNames from "classnames/bind";
import Timeago from "react-timeago";

const cx = classNames.bind(styles);
const Materialize = window.Materialize;

class Memo extends Component{

    render(){
        return(
            <div className = {cx("memo-wrapper")}>
                <div className = {cx("memo-header")}>
                    <div className = {cx("memo-title")}>
                        <div className = {cx("memo-user")}>
                        <a className = {cx("username")}>{this.props.writer}</a>
                        </div>
                        <div className = {cx("memo-day")}>
                        <Timeago date = {this.props.date}/>
                        </div>
                        <div className = {cx("memo-option")}>
                            <a className='dropdown-button' id='dropdown-button-id' data-activates='dropdown-id'>
                                <i className="material-icons icon-button">more_vert</i></a>
                                <ul id='dropdown' className='dropdown-content'>
                                    <li><a href="#!">Edit</a></li>
                                    <li><a href="#!">Remove</a></li>
                                </ul>
                        </div>
                    </div>
                </div>
                    <div className = {cx("memo-article")}>
                        {this.props.contents}
                    </div>
                    <div className= {cx("footer")}>
                        <div className = {cx("footer-arti")}>
                            <i className="material-icons log-footer-icon star icon-button">star</i>
                            <span className="star-count">0</span>
                        </div>
                    </div>
            </div>
        );
    };
};


Memo.defaultProps = {
    data : {
        _id: "id1234567890",
        writer : "Writer",
        contents : "Contents"
    }
};

export default Memo;