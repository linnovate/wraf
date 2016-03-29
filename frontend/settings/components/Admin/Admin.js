//import $            from "jquery";
import React        from "react";
import Wix          from "wix";
//import Cll          from "wix-collections";
import {}           from "wix-ui";

import "bootstrap-loader";
import "./style.scss";
import "../../common/style/common.scss";

export default class Admin extends React.Component {
    constructor() {
        super();
        /*this.state = {

        };*/

        $(document).ready(function () {
            console.log('Doc ready!', Wix);
            Wix.UI.initialize({

            });
        });

        console.log('lodash', _);
        console.log('jQuery', jQuery);
        console.log('$', $);
        //console.log('Cll', Cll);
        console.log('Wix', Wix);

        if (DEBUG) {
            console.log('Debug mode!');
        }
    }

    render() {
        return (
            <div class="container">
                bla
                bla
                <div data-wix-model="title" data-wix-ctrl="Input"
                     class=""
                     data-wix-options="{placeholder: '123'}"></div>
            </div>
        );
    }
}
