"use strict";


class ArticleTeaser extends HTMLElement {


    createdCallback() {
        this.innerHTML = this.template();
    }

    template() {
        return `<img src='app/assets/images/img.jpg'/>
                <div class='captcha'>
                    <h3>Title</h3>
                    <div>some text</div>
                </div>
                <i class="video-icon"></i>`;
    }

}

document.registerElement('article-teaser', ArticleTeaser);
