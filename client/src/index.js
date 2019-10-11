import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

//Redux Auth Firebase
// import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from "./store/reducers/rootReducer";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";
// import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
// import fbConfig from './config/fbConfig';

// const store = createStore(rootReducer, compose(
//     applyMiddleware(thunk.withExtraArgument({ getFirebase })),
//     reactReduxFirebase(fbConfig, { attachAuthIsReady: true }) // redux binding for firebase
// )
// );

// store.firebaseAuthIsReady.then(() => {
//     ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
//     registerServiceWorker();
// })

//Before trying redux auth
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
