import React, { Component } from "react";
import styles from "./Article.scss";
import classNames from "classnames/bind";
import { Door } from "../../part/Door";

const cx = classNames.bind(styles);

const Article = () => {
    return (
        <div>
            <Door />
        </div>
    );
};

export default Article;