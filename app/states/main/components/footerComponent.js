"use strict";

import formSearch from '../../../components/formSearch';

class FooterComponent extends HTMLElement {

    createdCallback() {

        this.innerHTML = this.template();
    }

    template() {
        return `<div class="inner">
                     <form-search></form-search>
                     <div class = 'copyright'>כל הזכויות שמורות ... בע"מ</div>
                </div>`;
    }
}

document.registerElement('footer-component', FooterComponent);
