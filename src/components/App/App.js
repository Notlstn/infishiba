import React, { Component } from "react";
import "./App.css";

import Toggle from "../UI/Toggle/Toggle";
import Header from "../UI/Header/Header";
import Sitebar from "../Sitebar/Sitebar";
import ImageBrowser from "../ImageBrowser/ImageBrowser";
import FeaturedBrowser from "../FeaturedBrowser/FeaturedBrowser";
import Aux from "../../hoc/_Aux/_Aux";
import Modal from "../UI/Modal/Modal";
import ImageModal from "../ImageBrowser/ImageModal/ImageModal";
import Logout from "../Logout/Logout";
import NoMatch from "../NoMatch/NoMatch";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";

class App extends Component {
    componentWillMount() {
        this.props.tryAutoAuth();
    }
    render() {
        return (
            <Aux>
                <div className={this.props.toggleState ? "AppWrapp AppWrapp--isOpen" : "AppWrapp"}>
                    <div className="Workbench">
                        <div className="WorkbenchNavigation">
                            <Header isAuth={this.props.auth.isAuth} />
                            <Toggle />
                        </div>
                        <Switch>
                            <Route path="/logout" exact component={Logout} />
                            <Route path="/ulubione" component={FeaturedBrowser} />
                            <Route path="/" exact component={ImageBrowser} />
                            <Route component={NoMatch} />
                        </Switch>
                    </div>
                    <Sitebar />
                </div>
                <Modal show={this.props.modalState} modalClosed={this.props.changeModalState}>
                    <ImageModal src={this.props.imageSrc} />
                </Modal>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        toggleState: state.menuOpened,
        modalState: state.modalOpened,
        imageSrc: state.modalImageSrc,
        auth: {
            isAuth: state.isAuth
        }
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeModalState: () => dispatch({ type: "CHANGE_MODAL_STATE", src: null }),
        tryAutoAuth: () => dispatch({ type: "TRY_AUTO_AUTH" })
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
