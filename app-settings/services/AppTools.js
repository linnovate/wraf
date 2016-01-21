"use strict";

/*
 * Index:
 * ------
 *
 * App events  (HashIsChanges, ExitApp).
 *
 * Service  (Http).
 *  
 * GUI  (BindHtml, BindClass, Repeat).
 * 
 * Integration  (RunAngular, RunReact, RunBlaze).
 * 
 * Others  (InitTemplate, FunctionByName, LockObject).
 *
 */

class BaseAppTools {

    constructor() {
    }

    // --- App events --- //

    static HashIsChanges(callback) {
        window.addEventListener('hashchange', callback);
        window.addEventListener('onpopstate', callback);
    }

//     static ExitApp(callback) {
//         window.addEventListener('onbeforeunload', callback);
//     }

    // --- Service - Helper --- //

    static Http(method, url) {
        var promise = new Promise(function(resolve, reject) {
            var client = new XMLHttpRequest()
            client.open(method, url)
            client.send()
            client.onload = function() {
                if (this.status == 200)
                    resolve(this.response);
                else
                    reject(this.statusText);
            }
            client.onerror = function() {
                reject(this.statusText);
            }
        }
        )
        return promise;
    }

    static ImportFrom(url,callback) {
            var _url = url.split('/');
            //var src =  document.currentScript.src.replace(location.origin+'/','').split('/');

            var fixUrl= `${location.origin}/{}`;
            url = `${location.origin}/${url}.js`;
            var client = new XMLHttpRequest()
            client.open('GET', url)
            client.send()
            client.onload = () => Function(event.target.responseText)();
            client.onerror = () =>  console.log(this.statusText);
           // console.log(this.response,src,_url)
    }

    // --- GUI - Helpers --- //

    static BindHtml(_this, el, name) {
        Object.defineProperty(_this, name, {
            get: function() {
                return el.innerHTML;
            },
            set: function(value) {
                el.innerHTML = value;
            }
        })
    }

    static BindClass(_this, el, name, myclass) {
        Object.defineProperty(_this, name, {
            get: function() {
                return el.classList.contains(myclass);
            },
            set: function(value) {
                if (value)
                    el.classList.add(myclass);
                else
                    el.classList.remove(myclass);
            }
        })
    }

    static Repeat(list, template) {
        let html = '', data;
        for (var index in list) {
            data = list[index];
            html += eval('`' + template + '`');
        }
        return html;
    }

    // --- Integration - Helpers --- //

    static RunAngular(htmlTmp, el, modules) {
        var _arguments;
        if (modules) {
            modules = modules.split(',');
            modules.unshift('ng');
            angular.injector(modules).invoke(function($compile, $rootScope) {
                htmlTmp = $compile(htmlTmp)($rootScope);
                _arguments = arguments;
            });
        } else if (!this.angular) {
            this.angular = angular.injector(['ng']);
            this.angular.invoke(function($compile, $rootScope) {
                htmlTmp = $compile(htmlTmp)($rootScope);
                _arguments = arguments;
            });
        }
        if(el){
            el.innerHTML = '';
            for (let i = 0; i < htmlTmp.length; i++)
                el.appendChild(htmlTmp[i]);
        }
        return [htmlTmp,_arguments];
    }

    static RunReact(name, el) {
        ReactDOM.render(React.createElement(this.getAttribute(name), {}), el);
    }

    static RunBlaze(name, el) {
        scope = '';
        return Blaze.renderWithData(Template[name], scope, el);
    }

    // --- Others - Helpers --- //

    static InitTemplate(_this, template) {
        _this.innerHTML = template;
        _this.el = {};
        let name, elements = _this.querySelectorAll('[el]');
        for (let i = 0; i < elements.length; i++) {
            name = elements[i].getAttribute("el");
            _this.el[name] = elements[i];
            _this.el[name].parent = _this;
        }
    }

    static FunctionByName(name) {
        return Function("return " + name)();
    }

    static LockObject(_this,name,publicName) {
        if(!_this[name])
             _this[name] = {};
        Object.defineProperty(_this,publicName, {
            get: () => _this[name],
            set: (value) =>  console.log("can't remove this.")
        })

        //  _this[name] = Object.freeze(_this[name]); // can't add item or change item
        //  _this[name] = Object.seal(_this[name])    // can't add item but can change item
    }
}

class AppTools extends BaseAppTools {

}

module.exports = AppTools;


// ----------------------------------------------------------------------------------------------------------------- //
// -------------------------------------------- Integration By domElement ------------------------------------------ //
// ----------------------------------------------------------------------------------------------------------------- //

// --- CustomElement: RunAngular --- //

// <run-angular modules="myApp">
//    // angular code ...
// </run-angular>
class RunAngular extends HTMLElement {
    createdCallback() {
        let self = this;
        let modules = self.getAttribute('modules') ? self.getAttribute('modules').split(',') : [];
        modules.unshift('ng');
        angular.injector(modules).invoke(function($compile,$rootScope) {
            var newTMP = $compile(self.innerHTML)($rootScope);
            self.innerHTML = '';
            for (let i = 0; i < newTMP.length; i++)
                self.appendChild(newTMP[i]);
        });
    }
}
document.registerElement('run-angular', RunAngular);


// --- CustomElement: RunReact --- //

// <run-react component="ReactComponentName" callback="setDataProps()"></run-react>
class RunReact extends HTMLElement {
    createdCallback() {
        var callback = Function("return " + this.getAttribute('callback'))();
        var reactComponent = Function("return " + this.getAttribute('component'))();
        ReactDOM.render(React.createElement(reactComponent, callback), this);
    }
}
document.registerElement('run-react', RunReact);


// --- CustomElement: RunBlaze --- //

// <run-blaze component="MyReactComponent"></run-blaze>
class RunBlaze extends HTMLElement {
    createdCallback() {
        let name = this.getAttribute('component'); // component == blazeTemplate
        this.viewHandler = Blaze.renderWithData(Template[name], {}, this);
    }
    detachedCallback() {
        Blaze.remove(this.viewHandler);
    }
}
document.registerElement('run-blaze', RunBlaze);


