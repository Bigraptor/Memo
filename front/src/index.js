import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { Homepage } from "./components/page/Homepage";
import { Memopage } from "./components/page/Memopage";
import thunk from "redux-thunk";
import reducers from "./components/reducers/index.js";

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
            <div>
                <Route exact path = "/" component = {Homepage} />
                <Route path = "/memo" component = {Memopage} />
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
