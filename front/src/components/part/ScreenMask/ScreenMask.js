import React, { Component } from "react";
import styles from "./ScreenMask.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class ScreenMask extends Component{
    render(){
        return(
            <div className = {cx("screen-mask")}>
                <div className = {cx("input-wrapper")}>
                    <div className = {cx("screen-input")}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default ScreenMask;