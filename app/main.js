import AppTools from './services/AppTools';
   
require("./components/main/main.css"); 
//require("./components/main/main-scss.scss"); 
   
window.AppTools = AppTools; 
 //ss
import appContentComponent from './components/appContentComponent';


function handleEvent (event) {
  console.log(event);
};

Wix.addEventListener(Wix.Events.SETTINGS_UPDATED, handleEvent);

if (Wix.Utils.getViewMode() !== 'standalone') {
   console.log("wix.Utils.getInstanceId: ",Wix.Utils.getInstanceId());
} 
