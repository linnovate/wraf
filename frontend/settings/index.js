import React from "react";
import ReactDOM from "react-dom";
import Form from "./components/form/Form";
import Wix          from "wix";

const mountPoint = document.createElement('div');
document.body.appendChild(mountPoint);
ReactDOM.render(<Form/>, mountPoint);

Wix.getSiteInfo(function(siteInfo) {
    console.log('siteInfo', siteInfo);
});