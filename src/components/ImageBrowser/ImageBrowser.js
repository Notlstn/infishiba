import React, { Component } from "react";
import "./ImageBrowser.css";
import Masonry from "react-masonry-component";
import SingleImage from "../SingleImage/SingleImage";
import shortid from "shortid";
import Loading from "./Loading/Loading";
import axios from "../../axios";
import Aux from "../../hoc/_Aux/_Aux";
import { connect } from "react-redux";
import db from "../../db";

Object.defineProperty(Array.prototype, "flat", {
    value: function(depth = 1) {
        return this.reduce(function(flat, toFlatten) {
            return flat.concat(Array.isArray(toFlatten) && depth - 1 ? toFlatten.flat(depth - 1) : toFlatten);
        }, []);
    }
});

export class ImageBrowser extends Component {
    state = {
        images: [],
        isBottom: false,
        loadMoreImages: true,
        showLoader: true
    };

    constructor(props) {
        super(props);
        this._timer = null;
        this._prevent = false;
    }

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

    _handleDoubleClick = src => {
        clearTimeout(this._timer);
        this._prevent = true;
        this._handleAddToFeatured(src);
    };

    _handleAddToFeatured = src => {
        if (this.props.auth.isAuth) {
            db.featuredShibas
                .where("[belongs+image_url]")
                .equals([this.props.auth.authLogin, src])
                .toArray()
                .then(response => {
                    if (response.length === 0) {
                        db.featuredShibas.put({
                            belongs: this.props.auth.authLogin,
                            image_url: src
                        });
                    }
                });
        }
    };

    _handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        const windowBottom = windowHeight + window.pageYOffset;

        if (windowBottom >= docHeight - 200 && !this.state.showLoader) {
            this.setState({
                showLoader: true
            });
        }

        if (windowBottom < docHeight - 200 && this.state.showLoader) {
            this.setState({
                showLoader: false
            });
        }

        if (windowBottom >= docHeight && !this.state.isBottom) {
            this.setState({
                isBottom: true,
                loadMoreImages: true
            });

            this._fetchNewBatch();
        }
    };

    _fetchNewBatch() {
        if (!this.state.loadMoreImages) return false;

        axios
            .get("/shibes?count=16", {
                crossdomain: true,
                responseType: "json"
            })
            .then(response => {
                let newImages = response.data.map(source => {
                    return {
                        key: shortid.generate(),
                        src: source
                    };
                });

                this.setState(prevState => ({
                    images: [...prevState.images, newImages].flat(2),
                    loadMoreImages: false,
                    isBottom: false,
                    showLoader: false
                }));
            })
            .catch(error => {});
    }

    componentWillMount() {
        window.addEventListener("scroll", this._handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this._handleScroll);
    }

    componentDidMount() {
        this._fetchNewBatch();
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

        if (this.state.images.length) {
            imageGrid = this.state.images.map(image => {
                return (
                    <SingleImage
                        src={image.src}
                        key={image.key}
                        click={this._handleClick}
                        doubleClick={this._handleDoubleClick}
                        isCollectable={this.props.auth.isAuth}
                    />
                );
            });
        }

        return (
            <Aux>
                <Masonry
                    className={"ImageBrowser"} // default ''
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false
                    options={{
                        isFitWidth: true
                    }}
                    onImagesLoaded={this._handleImagesLoaded}
                >
                    {imageGrid}
                </Masonry>
                {this.state.showLoader ? <Loading /> : null}
            </Aux>
        );
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
        changeModalState: src => dispatch({ type: "CHANGE_MODAL_STATE", src: src })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageBrowser);
