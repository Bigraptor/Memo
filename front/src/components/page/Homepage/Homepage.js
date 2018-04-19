import React, { Component } from "react";
import styles from "./Homepage.scss";
import { HomePagetemplate } from "../../template/HomePagetemplate";
import classNames from "classnames/bind";
import { connect } from "react-redux";
import { LoginModal } from "../../organism/LoginModal";
import { withRouter } from "react-router-dom";

const cx = classNames.bind(styles);

class Homepage extends Component{

    render(){
        return(
            <div className = {cx("homepage-wrapper")}>
                <HomePagetemplate />
                {this.props.status ? <LoginModal /> : ""}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status : state.showlogin.show
    };
};

export default withRouter(connect(mapStateToProps)(Homepage));