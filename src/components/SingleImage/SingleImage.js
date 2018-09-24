import React, { Component } from "react";
import "./SingleImage.css";

export class SingleImage extends Component {
    state = {
        action: null
    };

    constructor(props) {
        super(props);
        this._defaultClasses = ["SingleImage", "SingleImage--preloader"];
    }

    _handleClick = () => {
        this.props.click(this.props.src);
    };

    _handleDoubleClick = () => {
        setTimeout(
            function() {
                this.setState({ action: null });
            }.bind(this),
            4000
        );

        if (this.props.dbid !== undefined) {
            //delete featured
            this.props.doubleClick(this.props.dbid);
            this.setState({
                action: "delete"
            });
        } else {
            //featured
            this.props.doubleClick(this.props.src);
            this.setState({
                action: "add"
            });
        }
    };
    componentDidMount() {
        this._defaultClasses = ["SingleImage"];
    }
    render() {
        let itemClassNames = this._defaultClasses;
        if (this.props.isCollectable) {
            switch (this.state.action) {
                case "delete":
                    itemClassNames.push("SingleItem--deleteAnimation");
                    break;
                case "add":
                    itemClassNames.push("SingleItem--addAnimation");
                    break;
                default:
                    break;
            }
        }

        return (
            <div
                className={itemClassNames.join(" ")}
                onClick={this._handleClick}
                onDoubleClick={this._handleDoubleClick}
            >
                <img src={this.props.src} alt={this.props.src} />
            </div>
        );
    }
}

export default SingleImage;
