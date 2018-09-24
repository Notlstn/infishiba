import React, { Component } from "react";
import "./UserInterface.css";
import Aux from "../../../hoc/_Aux/_Aux";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

export class UserInterface extends Component {
    state = {
        login: "",
        password: "",
        isLoginAttempt: false,
        isValid: true
    };

    _handleInput = (event, formFieldId) => {
        let newValue = event.target.value.trim();
        if (formFieldId === "login") {
            this.setState({ login: newValue });
        }
        if (formFieldId === "password") {
            this.setState({ password: newValue });
        }
    };

    _checkValidity = value => {
        let validity = true;

        //required test
        if (!value || (0 === value.length && validity)) {
            validity = false;
            this.setState({ isValid: validity });
        }

        return validity;
    };

    _handleForm = event => {
        // event.preventDefault();
        if (this._checkValidity(this.state.login) && this._checkValidity(this.state.password)) {
            this.props.tryToAuth(this.state.login, this.state.password);
            this.props.history.push("/ulubione");
        }
    };

    render() {
        let output = (
            <form onSubmit={this._handleForm} className="LoginForm">
                <div className="LoginInput">
                    <label>Login</label>
                    <input type="text" value={this.state.login} onChange={event => this._handleInput(event, "login")} />
                </div>
                <div className="PasswordInput">
                    <label>Hasło</label>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={event => this._handleInput(event, "password")}
                    />
                </div>
                <button className="LoginButton">Zaloguj się!</button>
                <small className="SmallInfo">Użyj dowolnych danych.</small>
            </form>
        );
        if (this.props.auth.isAuth) {
            output = (
                <Aux>
                    <div className="UserInterface">
                        <div className="UserInterface__image">
                            <img src="https://via.placeholder.com/80x80" alt="userImage" />
                        </div>
                        <div className="UserInterface__info">
                            Cześć, <strong>{this.props.auth.authLogin}</strong>! <br />
                            <Link to="/logout">Wyloguj</Link>
                        </div>
                    </div>
                    <Link to="/ulubione" className="UserInterface__featured">
                        Twoje ulubione Shibby
                    </Link>
                </Aux>
            );
        }
        return <Aux>{output}</Aux>;
    }
}

const mapStateToProps = state => {
    return {
        auth: {
            isAuth: state.isAuth,
            authLogin: state.authLogin,
            authId: state.authId
        }
    };
};

const mapDispatchToProps = dispatch => {
    return {
        tryToAuth: (login, password) => dispatch({ type: "TRY_AUTH", login: login, passphase: password }),
        tryAutoAuth: () => dispatch({ type: "TRY_AUTO_AUTH" })
    };
};
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(UserInterface)
);
