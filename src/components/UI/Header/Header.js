import React, { Component } from "react";
import "./Header.css";
import logotype from "./logotype.png";
import { Link } from "react-router-dom";

export default class Header extends Component {
    render() {
        let protip = null;
        if (!this.props.isAuth) {
            protip = (
                <div className="Header__protip shake-little">
                    <span>Heeej! Wiesz, że możesz wybrać swoje ulubione Shiby?</span>
                    <svg
                        version="1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 362 362"
                        preserveAspectRatio="xMidYMid meet"
                        width="50"
                        height="50"
                    >
                        <path
                            fill="#fff"
                            d="M194 4c-3-5-11-5-13 0-21 38-40 76-51 118-1 6 5 12 11 8 12-8 23-19 32-31-3 86-14 175 6 259 1 6 12 5 11-1-11-88-2-175-1-262l30 27c5 5 14 2 13-5-5-40-18-78-38-113zm-7 73c-4-6-14-5-14 4v1l-22 22c10-28 22-54 36-81 12 24 21 49 26 75l-21-19c-1-2-3-3-5-2z"
                        />
                    </svg>
                </div>
            );
        }
        return (
            <div className="Header">
                <Link to="/">
                    <img src={logotype} alt="InfiShiba" />
                </Link>
                {protip}
            </div>
        );
    }
}
