import React from "react";
import ReactDOM from "react-dom";

import Layout from "./components/Layout";

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<Layout/>, app);

Wix.getExternalId(startWithId);

function startWithId (id) {
    var settings = _.assign(
        {},
        Wix.Styles.getStyleParams().fonts,
        Wix.Styles.getStyleParams().numbers,
        Wix.Styles.getStyleParams().colors,
        Wix.Styles.getStyleParams().booleans
    );

    console.log('id', id);
    console.log('settings', settings);
}

//Wix.Settings.refreshApp();
Wix.addEventListener(Wix.Events.EDIT_MODE_CHANGE , function(e) {
    console.log('Wix.Events.EDIT_MODE_CHANGE : ', e);
});
