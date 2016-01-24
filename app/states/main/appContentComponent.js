"use strict";

import HeaderComponent from './components/headerComponent';
import FooterComponent from './components/footerComponent';
import homeState from '../home/homeState';

class appContentComponent extends HTMLElement {

    createdCallback() {
        this.innerHTML = this.template();
    }

    template() {
        return `<header-component></header-component>
                    <div class="main-content inner">
                        <home-state-component></home-state-component>
                    </div>
                <footer-component></footer-component>`;
    }

}

document.registerElement('app-content', appContentComponent);
