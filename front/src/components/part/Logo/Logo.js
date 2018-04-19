import React , {Component} from "react";
import styles from "./Logo.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

class Logo extends Component{
    render(){
        return (
            <div className = {cx("logo")}>
                <Link to = "/" className = {cx("logo-link")}>
                Bigraptor
                </Link>
            </div>
        );
    }
}

export default Logo;