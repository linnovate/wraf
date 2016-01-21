"use strict";


//import facebookLike from '../../../components/facebookLike'; 
//import formSearch from '../../../components/formSearch';





class HeaderComponent extends HTMLElement {

    createdCallback() {
        this.mainMenuList  = [{
    label: 'בית',
    url: '#home'
}, {
    label: 'אודות',
    url: '#about'
}, {
    label: 'צור קשר',
    url: '#contact-us'
},{
    label: 'מידע',
    url: '#info'
}];
        this.innerHTML = this.template();
    }

    template() {
        
        return `<div class="inner">
                    <div class="row">
                        <a href="#home" class="logo" ><img src="app/assets/images/logo.png"/></a>
                        <form-search></form-search>
                        <facebook-like></facebook-like>
                    </div>
                </div>
                <div class="menu-row">
                    <ul class=" inner main-menu">
                      ${this.mainMenuList.map((item)=>
                        '<li><a href="'+item.url+'">'+item.label+'</a></li>'
                      )}
                    </ul>
                </div>`;
    }

}

document.registerElement('header-component', HeaderComponent);
