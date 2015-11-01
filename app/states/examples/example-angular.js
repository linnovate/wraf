"use strict";

// step 1 - run any angular

// step 2 - write angular detilas with ES6

// https://github.com/michaelbromley/angular-es6

// Class of controller function
class MyFormCtrl {
    constructor($timeout) {
        this.$timeout = $timeout;
        this.user = {}
        this.userFields = [
        {
            key: 'username',
            type: 'input',
            templateOptions: {
                label: 'Username',
                placeholder: 'johndoe',
                required: true,
                description: 'Descriptive text'
            }
        }, 
        {
            key: 'password',
            type: 'input',
            templateOptions: {
                type: 'password',
                label: 'Password',
                required: true
            },
            expressionProperties: {
                'templateOptions.disabled': '!model.username'// disabled when username is blank
            }
        }
        ];
    }

    onSubmit() {
        console.log('form submitted:', this.user);
    }
}


// Create angular module, Add modules
angular.module('myApp', ['formly', 'formlyBootstrap']);
// $inject
MyFormCtrl.$inject = ['$timeout'];
// Add controllers or directives
angular.module('myApp').controller('MyFormCtrl', () => new MyFormCtrl);




// use ES5 function at directive not `class` of ES6
function MyDirective() {
    var name = "aspadd"
    var directive = {
        template: `<div {{callback}}>I\'m a directive of ${name}!</div>`,
        link: function(scope,el){
            // var callback = Function("return " + el[0].getAttribute('callback'))();
        }
    };
   

    return directive;
}
// $inject
MyDirective.$inject = ['$interval'];
angular.module('myApp').directive('myDirective', MyDirective)



function RunAngularByJS(){
    
   var tmp = document.querySelector('.directive') || '<div my-directive></div>';
   var baseEelement = document.querySelector('.directive2');
   var modules = 'myApp';
   var newTmpAndServices = AppTools.RunAngular(tmp,baseEelement, modules);

}