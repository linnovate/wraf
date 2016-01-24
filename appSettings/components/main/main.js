"use strict";


class ArticleCaptcha extends HTMLElement {


    createdCallback() {
        this.innerHTML = this.template();
    }

    template() {
        return `<header class="box">
  <div class="logo">
    <img width="86" src="images/wix_icon.png" alt="logo"/>
  </div>
  <div class="loggedOut">
    <p translate="description">
    </p>

    <div class="login-panel">
      <p class="create-account" translate="create"></p>
      <button class="submit uilib-btn connect">{{'connect' | translate}}</button>
    </div>
  </div>
  <div class="loggedIn hidden">
    <p>{{'connected' | translate:params}}<br/>
      <a class="disconnect-account">{{'disconnect' | translate}}</a></p>

    <div class="premium-panel">
      <p class="premium-features ">{{'premium' | translate}}</p>
      <button class="submit uilib-btn btn-upgrade upgrade">{{'upgrade' | translate}}</button>
    </div>
  </div>
</header>

<div wix-ctrl="Accordion">

  <div class="acc-pane">
    <h3>General Settings: </h3>

    <div class="acc-content">
      <ul class="list">
        <li wix-label="Image Visibility:">
          <div wix-model="imageVisibility" wix-ctrl="Dropdown" style="width:144px">
            <option value="show">Show Images</option>
            <option value="hide">Hide Images</option>
            <option value="showhover">Show Images on Hover</option>
          </div>
        </li>
        <li wix-label="Number of images:">
          <div wix-model="numOfImages" wix-ctrl="Slider" wix-options="{ preLabel:'0', postLabel:'100'}"></div>
        </li>
        <li wix-label="Show Icons:">
          <div wix-model="isIconShown" wix-ctrl="Checkbox"></div>
        </li>
      </ul>
    </div>
  </div>

  <div class="acc-pane">
    <h3>Color Settings (wix-params demo): </h3>

    <div class="acc-content">
      <ul class="list">
        <li wix-label="Text Color:">
          <div wix-param="textColor" wix-ctrl="ColorPickerWithOpacity" wix-options="{startWithColor:'color-5'}"></div>
        </li>
        <li wix-label="Background Color:">
          <div wix-param="backgroundColor" wix-ctrl="ColorPickerWithOpacity"
               wix-options="{startWithColor:'color-1'}"></div>
        </li>
      </ul>
    </div>
  </div>

  <div class="acc-pane">
    <h3>Sync Options</h3>

    <div class="acc-content">
      <p>How many images to sync ?</p>

      <div wix-model="imagesToSync" wix-ctrl="Radio">
        <div data-radio-value="sync10">Sync 10 images</div>
        <div data-radio-value="sync25">Sync 25 images</div>
        <div data-radio-value="sync50">Sync 50 images</div>
      </div>
      <p>Sync Meta Data ?</p>

      <div wix-model="imageMeta" wix-ctrl="Checkbox:{ postLabel:'Image Meta'}">ddd</div>
      <div wix-model="imageAlt" wix-ctrl="Checkbox:{ postLabel:'Image Alt'}">aaa</div>
      <div wix-model="imageLink" wix-ctrl="Checkbox:{ postLabel:'Image Link'}">aa</div>
    </div>
  </div>

  <div class="acc-pane">
    <h3>Button Group</h3>

    <div class="acc-content">
      <div wix-model="adsSize" wix-ctrl="ButtonGroup">
        <button value="mini">Mini</button>
        <button value="medium">Medium</button>
        <button value="large">Large</button>
      </div>
    </div>
  </div>

</div>`;
    }

}

document.registerElement('app-content', ArticleCaptcha);
