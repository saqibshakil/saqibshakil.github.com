
/// <reference path="../../typings/app.d.ts" />
/// <reference path="../../typings/backbone.d.ts" />
/// <reference path="../../typings/require.d.ts" />
// For each js file you need to access from typescript you need an amd-dependency
/// <amd-dependency path="backbone"/>
/// <amd-dependency path="namespace"/>
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="underscore"/> 
/// <amd-dependency path="knockback"/>
/// <amd-dependency path="knockout"/>

var Backbone = require("backbone");
var Marionette = require("marionette");
var $ = require("jquery");
var _ = require("underscore");
var kb = require("knockback");
var ko = require("knockout");


export class PersonViewModel {
    controller: any;
    model: any;
    bbModel: Backbone.Model;
    constructor(model) {
        this.model = kb.viewModel(model);
        this.bbModel = model;
    }

    Update() {
        //Some code to post data to server and get results
        //You can access the Model as json using self.parentView.model
        this.controller.Save.apply(this.controller,[this.bbModel]);
    };

    SetDefaultName() {
        this.model.Name("Saqib");
    }


}

// Create a module to hide our private implementation details 