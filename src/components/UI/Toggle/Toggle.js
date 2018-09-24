import React, { Component } from "react";
import "./Toggle.css";

import { connect } from "react-redux";

export class Toggle extends Component {
    render() {
        return (
            <svg
                onClick={this.props.changeMenuState}
                className={this.props.toggleState ? "Toggle Toggle--rotated" : "Toggle"}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="48"
                height="48"
            >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path
                    fill="#fff"
                    d="M4 18h16c.6 0 1-.5 1-1 0-.6-.5-1-1-1H4a1 1 0 0 0-1 1c0 .6.5 1 1 1zm0-5h16c.6 0 1-.5 1-1 0-.6-.5-1-1-1H4a1 1 0 0 0-1 1c0 .6.5 1 1 1zM3 7c0 .6.5 1 1 1h16c.6 0 1-.5 1-1 0-.6-.5-1-1-1H4a1 1 0 0 0-1 1z"
                />
            </svg>
        );
    }
}

const mapStateToProps = state => {
    return {
        toggleState: state.menuOpened
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeMenuState: () => dispatch({ type: "CHANGE_MENU_STATE" })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toggle);
