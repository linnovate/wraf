import $            from "jquery";
import { WixImage } from "wixmedia";
import React        from "react";
import Wix          from "wix";
import Cll          from "wix-collections";
import Header       from "./Header/Wrap";

import "bootstrap-loader";
import "./main.css";

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "Welcome to Wix!"
        };

        console.log('lodash', _);
        console.log('jquery', $);
        console.log('WixImage', WixImage);
        console.log('Cll', Cll);
        console.log('Wix', Wix);

        if (DEBUG) {
            console.log('Debug mode!');
        }
    }

    changeTitle(title) {
        this.setState({title});
    }

    render() {
        return (
            <div class="container">
                <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title}/>
            </div>
        );
    }
}
