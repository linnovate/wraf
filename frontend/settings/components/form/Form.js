import React        from "react";
import Wix          from "wix";
import { WixImage } from "wixmedia";
import Cll          from "wix-collections";
// wix ui-lib2
import "wix/wix-ui-lib2/ui-lib";
import "wix/wix-ui-lib2/ui-lib.css";
// style
import "./style.scss";

export default class Form extends React.Component {
    constructor() {
        super();

        $(document).ready(function () {
            var settings = _.assign(
                {},
                Wix.Styles.getStyleParams().fonts,
                Wix.Styles.getStyleParams().numbers,
                Wix.Styles.getStyleParams().colors,
                Wix.Styles.getStyleParams().booleans
            );

            console.log('settings in admin', settings);

            Wix.UI.initialize({
                numOfImages: 100,
                isIconShown: true,
                imageVisibility: 'show',
                imagesToSync: 1,
                //email: settings.email,
                imageLink: false
            });

            Wix.UI.onChange('imageVisibility', function(value, key) {
                console.log('imageVisibility: ', value);
            });

            $('.save-btn').click(function () {
                Wix.Settings.refreshApp();
            });

            $('#email').keyup(function (e) {
                var key = 'email', value = e.target.value;
                Wix.Styles.setFontParam(key, {
                        value: value
                    }
                );
            })
        });

        console.log('lodash', _);
        console.log('$', $);
        console.log('Cll', Cll);
        console.log('Wix', Wix);
        console.log('WixImage', WixImage);

        if (DEBUG) {
            console.log('Debug mode!');
        }
    }

    render() {
        return (
            <div>
                <header class="box">
                    <div class="logo">
                        <img width="86" src={require('wix/wix-ui-lib2/images/wix_icon.png')} alt="logo"/>
                    </div>
                    <div class="loggedOut">
                        <p>
                            This is a sample Settings view for widgets and pages created with <a href="http://dev.wix.com"
                                                                                                 target="_blank">Wix's 3rd Party SDK</a>,
                            compatible with Wix's product requirements.
                            This boilerplate is aimed at saving time for developing the UI of your apps, and let the
                            developer focus on developing logic.
                        </p>

                        <div class="login-panel">
                            <button class="save-btn uilib-btn connect">Save settings</button>
                        </div>
                    </div>
                </header>


                <div class="accordion" data-wix-ctrl="Accordion">

                    <div data-wix-scroll="{height:446}">
                        <div class="acc-pane">
                            <h3>General Settings: </h3>
                            <div class="acc-content">
                                <ul class="list">
                                    <li data-wix-label="Image Visibility:">
                                        <div data-wix-param="imageVisibility" data-wix-ctrl="Dropdown" data-wix-options="{width:150}">
                                            <div value="show">Show Images</div>
                                            <div value="hide">Hide Images</div>
                                            <div value="showhover">Show Images on Hover</div>
                                        </div>
                                    </li>
                                    <li data-wix-label="Language Picker:">
                                        <div data-wix-model="lang" data-wix-ctrl="LanguagePicker"
                                             data-wix-tooltip=" {placement:'top', text:'Pick Language'}"></div>
                                    </li>
                                    <li data-wix-label="Number of images:">
                                        <div data-wix-param="numOfImages" data-wix-ctrl="Slider"
                                             data-wix-options="{ maxValue:500, preLabel:'0', postLabel:'500', toolTip:true}"></div>
                                        <div data-wix-param="numOfImages" data-wix-ctrl="Spinner" data-wix-options="{ maxValue:500 }"></div>
                                    </li>
                                    <li data-wix-label="Fonts:">
                                        <div data-wix-param="myFont" data-wix-ctrl="FontStylePicker"></div>
                                    </li>
                                    <li data-wix-label="Email address:">
                                        <div id="email" data-wix-param="email" data-wix-ctrl="Input" data-wix-options="{ placeholder: 'john@doe.com' }"></div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="acc-pane">
                            <h3>Color Settings: </h3>
                            <div class="acc-content">
                                <ul class="list">
                                    <li data-wix-label="Text Color:">
                                        <div data-wix-param="textColor" data-wix-ctrl="ColorPicker"
                                             data-wix-options="{startWithColor:'color-5'}"></div>
                                    </li>
                                    <li data-wix-label="Background Color:">
                                        <div data-wix-param="backgroundColor" data-wix-ctrl="ColorPickerWithOpacity"
                                             data-wix-options="{startWithColor:'color-1', startWithOpacity: 50}"></div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="acc-pane">
                            <h3>Sync Options</h3>
                            <div class="acc-content">
                                <p>How many images to sync ?</p>

                                <div data-wix-model="imagesToSync" data-wix-ctrl="Radio">
                                    <div data-radio-value="sync10">Sync 10 images</div>
                                    <div data-radio-value="sync25">Sync 25 images</div>
                                    <div data-radio-value="sync50">Sync 50 images</div>
                                </div>
                                <p>Sync Meta Data ?</p>

                                <div data-wix-model="imageMeta" data-wix-ctrl="Checkbox:{ postLabel:'Image Meta'}"></div>
                                <div data-wix-model="imageAlt" data-wix-ctrl="Checkbox"
                                     data-wix-options="{ postLabel:'Image Alt', checked:true}"></div>
                                <div data-wix-model="imageLink" data-wix-ctrl="Checkbox:{ postLabel:'Image Link'}"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
