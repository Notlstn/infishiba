import React from "react";
import "./Backdrop.css";

const Backdrop = props => (
    <div
        className="Backdrop"
        onClick={props.clicked}
        style={{
            display: props.show ? "block" : "none"
        }}
    >
        {props.children}
    </div>
);

export default Backdrop;
