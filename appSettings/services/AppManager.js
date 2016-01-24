"use strict";

import AppTools from './AppTools';

class AppManagerClass {

    constructor() {
        this.SetupRoutes();
        AppTools.LockObject(this,'_status','status');
        AppTools.LockObject(this,'_settings','settings');
    }

    SetupRoutes() {
        AppTools.LockObject(this,'_routesList','routesList');

        AppTools.HashIsChanges(function(e) {
            (location.hash in this._routesList) && this._routesList[location.hash](e)
        }.bind(this));

    }

}

var AppManager = new AppManagerClass();

module.exports = AppManager;
