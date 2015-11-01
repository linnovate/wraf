


import AppTools from './services/AppTools';

window.AppTools = AppTools;

import AppManager from './services/AppManager';
import ApiService from './services/ApiService';
 
import appContentComponent from './states/main/appContentComponent';



AppManager.routesList['#home'] = (e) => { console.log(e, location, location.hash) };
AppManager.routesList['#about'] = (e) => { console.log(e, location, location.hash) };



require("./assets/styles/style.css")
