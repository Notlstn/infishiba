import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import "./index.css";
import App from "./components/App/App";
import registerServiceWorker from "./registerServiceWorker";
import reducer from "./store/reducer";
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducer);

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById("root"));
registerServiceWorker();
