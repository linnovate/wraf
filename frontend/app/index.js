import React from "react";
import ReactDOM from "react-dom";

import Layout from "./components/Layout";

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<Layout/>, app);

Wix.addEventListener(Wix.Events.EDIT_MODE_CHANGE , function(e) {
    console.log('Wix.Events.EDIT_MODE_CHANGE : ', e);
});