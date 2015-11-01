"use strict";


// ----------------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------- Exemple "Blaze" ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------------------- //

// -- template

// <template name="hello">
//   <button>Click Me</button>
//   <p>You've pressed the button {{counter}} times.</p>
// </template>

// Template.hello.helpers({
//     counter: function () {
//       return Session.get('counter');
//     }
// });

// Template.hello.events({
//     'click button': function () {
//       // increment the counter when button is clicked
//     }
// });

// use 

//  {{> hello}}







// 1. get service of routes
// 2. save globl settings AppManager.settings = {userId,}
// 3. get help function
// 4. save status of things AppManager.status = {openMenu,}


// order of app:
// buttom level and general lavel = services (like of AppManager, MyApi,basic_fuction_like_BL_without_gui)
// middle lavel = components
// top lavel = flow app

// order of files:
//   servises
//   components
//   state - domain = main (index.html)
//      components = header,footer,sidebar
//   state - domain = about-page
//      components = slider, info
//   state - domain 3
//      components

