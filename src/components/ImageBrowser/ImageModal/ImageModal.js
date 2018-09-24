import React from "react";
import Aux from "../../../hoc/_Aux/_Aux";

const ImageModal = props => {
    return (
        <Aux>
            <img src={props.src} alt="#" />
        </Aux>
    );
};
export default ImageModal;
