"use strict";


class FacebookLike extends HTMLElement {

    createdCallback() {
        this.innerHTML = this.template();
    }
    
    template() {
        return `<div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>`;
    }
}

document.registerElement('facebook-like', FacebookLike);
