import AppTools from './services/AppTools';

window.AppTools = AppTools;

import appContentComponent from './components/appContentComponent';


function handleEvent (event) {
  console.log(event);
};

Wix.addEventListener(Wix.Events.SETTINGS_UPDATED, handleEvent);

if (Wix.Utils.getViewMode() !== 'standalone') {
   console.log("wix.Utils.getInstanceId: ",Wix.Utils.getInstanceId());
} 
