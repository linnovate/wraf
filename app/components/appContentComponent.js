"use strict";

import HeaderComponent from './headerComponent';
import FooterComponent from './footerComponent';

class appContentComponent extends HTMLElement {

    createdCallback() {
        this.innerHTML = this.template();
    }

    template() {
        return `<header-component></header-component>
                    <div>
  <h1>Welcome!</h1>
  <p ng-show="!instanceId">
    To get started create an app instance on <a href="http://dev.wix.com">dev.wix.com</a>
    and set <a href="http://localhost:9000/index.html">http://localhost:9000/index.html</a> as main app endpoint and
    <a href="http://localhost:9000/settings.html">http://localhost:9000/settings.html</a> as settings endpoint
  </p>
  <p ng-show="instanceId">
    <b>Widget instance ID</b>: {{instanceId}}<br /><br />
    <b>Instance</b>:<br /> {{instance}}
  </p>
  <p class="message" ng-show="message">
    Settings have been updated
  </p>
</div>
                <footer-component></footer-component>`;
    }

}

document.registerElement('app-content', appContentComponent);
