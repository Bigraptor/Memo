import React, { Component } from "react";
import styles from "./Door.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

class Door extends Component{
    render(){
        return(
            <div className = {cx("door")}>
                <div className = {cx("door-write")}>
                        <div className = {cx("write-title")}>계정인증 구현 연습</div>
                        <div className = {cx("write-arti")}>
                            Node.js와 React의 계정인증 구현 연습.<br/><br />
                            Account practice<br /><br />
                            계정인증 연습<br/>
                        <div className = {cx("door-image-write")}>
                            <Link to = "/memo">
                                살 펴 보 기
                            </Link>
                        </div>
                        </div>
                </div>
                <div className = {cx("door-image")}>
                    <div className = {cx("door-image-wrapper")}>
                        <div className = {cx("door-image-first")}>
                            <img src = {require("../../../static/images/paradise.png")} alt = "달팽이"/>
                        </div>
                    </div>
                    <div className = {cx("door-image-second")}>
                        <img src = {require("../../../static/images/shark.png")} alt = "상어"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Door;