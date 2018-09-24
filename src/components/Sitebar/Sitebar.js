import React, { Component } from "react";
import "./Sitebar.css";
import UserInterface from "./UserInterface/UserInterface";
import Aux from "../../hoc/_Aux/_Aux";

export class Sitebar extends Component {
    render() {
        return (
            <Aux>
                <div className="Sitebar">
                    <small className="nice_protip">
                        Pojedyńcze kliknięcie powiększa. <br />
                        Podwójne kliknięcie dodaje do kolekcji. Po zalogowaniu.
                    </small>
                    <UserInterface />
                </div>
            </Aux>
        );
    }
}

export default Sitebar;
