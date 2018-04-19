import React, {Component} from "react";
import style from "./HomePagetemplate.scss";
import classNames from "classnames/bind";
import { Header } from "../../organism/Header";
import { Article } from "../../organism/Article";

const cx = classNames.bind(style);

class HomePagetemplate extends Component{
    render(){
        return(
            <div className = {cx("template-wrapper")}>
                <div className = {cx("template-margin")}>
                    <div>
                        <Header />
                    </div>
                    <div className = {cx("template-article")}>
                        <Article />
                    </div>
                    <div className = {cx("template-footer")}>
                        footer
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default HomePagetemplate;