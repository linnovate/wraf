"use strict";

// ----------------------------------------------------------------------------------------------------------------- //
// -------------------------------------------- Exemple "customElement" -------------------------------------------- //
// ----------------------------------------------------------------------------------------------------------------- //

class MyElement extends HTMLElement {
    
    generalRepeat(list, template) {
        let html = '', data;
        for (var index in list) {
            data = list[index];
            html += eval('`' + template + '`');
        }
        return html;
    }
    
    template() {
        
        this.list = ["home", "about"];
        var obj = {
            label: 'home',
            url: '/'
        }
        this.isOpenMenu = true;
        
        function getClass() {
            if (this.isOpenMenu)
                return 'some-class';
        }
        
        return ` <img onclick='parent.click_option()' />
                <div class="css ${this.isOpenMenu}" ${this.isOpenMenu ? 'attr-name="open"' : getClass()} ></div>
                <ul class="array-list">
                    ${this.list.map((item)=>'<li>'+item+'</li>')}
                </ul>
                <ul class="obj-list">
                    ${Object.keys(obj).map((key)=>
        '<li><a href="'+obj[key].url+'">'+obj[key].label+'</a></li>'
        )}
                </ul>
                <div class="custom-function ${this.isOpenMenu}">
                    ${this.generalRepeat(
        obj, '<li><a href="${data.url}">${data.label}</a></li>'
        )}
                </div>`;
    }
    
    click_event() {
        console.log('clicked', this)
        // event - el is called
        // this  - el is by the way of called:
        //         onclick='parent.click_event(params)' == base element
        //         el.onclick = function() { } == called element
    
    }
    
    createdCallback() {
        
        // -- 1. run data  -- //
        var callback = Function("return " + this.getAttribute('callback'))();

        // must first set data before run template - `  `.
        this.data = '';
        // ......
        
        // set template in function for praktis to can load easy and meny time.
        this.innerHTML = this.template();
        
        
        // -- 2. set easz pointer of a child -- //
        
        this.cssChild = this.querySelector('div.css');
        this.cssChild.innerHTML = "some text";
        
        
        // -- 3. set parent in a child  for -- //
        
        var el = this.querySelector('img');
        el.parent = this;
        
        //  use in any child of child the base parent event
        //  <custom-element>
        //     <img onclick='parent.click_option(parem)' />
        //  </custom-element>
        
        
        // -- 4. setup html binding -- //
        
        this.cssChild = this.querySelector('div.css');
        
        Object.defineProperty(this, 'myHtmlBinding', {
            get: function() {
                return this.cssChild.innerHTML;
            },
            set: function(value) {
                this.cssChild.innerHTML = value;
            }
        });
        
        this.myHtmlBinding = 'test';
        
        
        // -- 4. setup html binding -- //
        
        this.cssChild = this.querySelector('div.css');
        this.openMenuClass = 'open-menu';
        
        Object.defineProperty(this, "isOpenMenu", {
            get: function() {
                return this.cssChild.classList.contains(this.openMenuClass);
            },
            set: function(value) {
                if (value)
                    this.cssChild.classList.add(this.openMenuClass);
                else
                    this.cssChild.classList.remove(this.openMenuClass);
            }
        });
        
        this.isOpenMenu = true;
        
        // -- END -- //
    
    }

}

// registerElement
// need wire the element name 'string-string'
document.registerElement('my-element', MyElement);
