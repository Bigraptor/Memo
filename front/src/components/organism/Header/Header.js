import React, {Component} from "react";
import styles from "./Header.scss";
import classNames from "classnames/bind";
import { Logo } from "../../part/Logo";
import { Menu } from "../../part/Menu"; 

const cx = classNames.bind(styles);

class Header extends Component{
    render(){
        return(
            <div className = {cx("header-wrapper")}>
                <div className = {cx("header-logo")}>
                    <Logo />
                </div>
                <div className = {cx("header-empty")}>
                </div>
                <div className = {cx("header-menu")}>
                    <Menu />
                </div>
            </div>
        );
    }
}

export default Header;