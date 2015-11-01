"use strict";

import articleTeaser from '../../components/articleTeaser';
import articleCaptcha from '../../components/articleCaptcha';


class HomeStateComponent extends HTMLElement {

    createdCallback() {
        this.innerHTML = this.template();
    }

    template() {
        return `<div class="right">
                    <article-teaser></article-teaser>
                    <article-teaser></article-teaser>
                    <article-teaser></article-teaser>
                    <article-teaser></article-teaser>
                    <article-teaser></article-teaser>
                </div>
                <div class="right">
                    <article-captcha></article-captcha>
                    <article-captcha></article-captcha>
                    <article-captcha></article-captcha>
                    <article-captcha></article-captcha>
                    <article-captcha></article-captcha>
                </div>`;
    }

}

document.registerElement('home-state-component', HomeStateComponent);
