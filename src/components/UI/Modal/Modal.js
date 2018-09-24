import React, { Component } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/_Aux/_Aux";

class modal extends Component {
    componentDidUpdate() {
        if (this.props.show) {
            disableBodyScroll(document.querySelector("body"));
        } else {
            clearAllBodyScrollLocks();
        }
    }

    render() {
        return (
            <Aux>
                <div
                    className="Modal"
                    style={{
                        opacity: this.props.show ? "1" : "0"
                    }}
                >
                    {this.props.children}
                </div>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
            </Aux>
        );
    }
}

export default modal;
