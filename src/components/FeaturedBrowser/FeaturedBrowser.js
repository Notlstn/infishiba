import React, { Component } from "react";
import "./FeaturedBrowser.css";
import Masonry from "react-masonry-component";
import SingleImage from "../SingleImage/SingleImage";
import Aux from "../../hoc/_Aux/_Aux";
import { connect } from "react-redux";
import db from "../../db";
import shortid from "shortid";
import { Link, Redirect } from "react-router-dom";

export class FeaturedBrowser extends Component {
    constructor(props) {
        super(props);
        this._timer = null;
        this._prevent = false;
    }

    state = {
        images: []
    };

    _handleClick = src => {
        this._prevent = false;
        this._timer = setTimeout(() => {
            if (!this._prevent) {
                this._handleSingleClick(src);
            }
            this._prevent = false;
        }, 250);
    };

    _handleSingleClick = src => {
        this.props.changeModalState(src);
    };

    _handleDoubleClick = dbid => {
        clearTimeout(this._timer);
        this._prevent = true;
        if (dbid) {
            this._handleRemoveFromFeatured(dbid);
        }
    };

    _handleAddToFeatured = () => {
        if (this.props.auth.isAuth) {
            // TODO: ograniczyć do unikalnych
            db.featuredShibas.put({
                belongs: this.props.auth.authLogin,
                image_url: this.props.src
            });
        }
    };

    _handleRemoveFromFeatured = dbid => {
        db.featuredShibas.delete(dbid);

        let newImageSet = this.state.images.filter(single => {
            return single.dbId !== dbid;
        });

        this.setState({
            images: newImageSet
        });
    };

    componentWillMount() {
        this.props.changeMenuState();
        if (this.props.auth.isAuth) {
            db.featuredShibas
                .where("belongs")
                .equals(this.props.auth.authLogin)
                .toArray()
                .then(respond => {
                    let imageSet = respond.map(single => {
                        return {
                            key: shortid.generate(),
                            src: single.image_url,
                            dbId: single.id
                        };
                    });
                    this.setState({
                        images: imageSet
                    });
                });
        }
    }
    _handleImagesLoaded(imagesLoadedInstance) {
        imagesLoadedInstance.images.map(singleImage => {
            if (singleImage.isLoaded !== undefined) {
                singleImage.img.parentElement.classList.remove("SingleImage--preloader");
            }
        });
    }
    render() {
        let imageGrid = null;
        if (!this.props.auth.isAuth) {
            return <Redirect to="/" />;
        }
        if (this.state.images.length) {
            imageGrid = this.state.images.map(image => {
                return (
                    <SingleImage
                        src={image.src}
                        key={image.key}
                        featured
                        dbid={image.dbId}
                        click={this._handleClick}
                        doubleClick={this._handleDoubleClick}
                    />
                );
            });
        }

        let output = (
            <div className="FeaturedBrowser__empty">
                Wygląda na to, że nie wybrałeś żadnych zdjęć. <br />
                <Link to="/"> Wróć do przeglądarki, by wybrac swoje Shibby</Link>
            </div>
        );
        if (this.state.images.length) {
            output = (
                <Masonry
                    className={"FeaturedBrowser"} // default ''
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false
                    options={{
                        isFitWidth: true
                    }}
                    onImagesLoaded={this._handleImagesLoaded}
                >
                    {imageGrid}
                </Masonry>
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
        changeModalState: src => dispatch({ type: "CHANGE_MODAL_STATE", src: src }),
        changeMenuState: () => dispatch({ type: "CHANGE_MENU_STATE", state: false })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeaturedBrowser);
