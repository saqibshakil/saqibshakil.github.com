/// <reference path="../../typings/app.d.ts" />
/// <reference path="../../typings/backbone.d.ts" />
/// <reference path="../../typings/require.d.ts" />
// For each js file you need to access from typescript you need an amd-dependency
/// <amd-dependency path="backbone"/>
/// <amd-dependency path="localstorage"/>
/// <amd-dependency path="knockback"/>
/// <amd-dependency path="knockout"/>

var Backbone = require("backbone");
import GL = module("../../js/libs/GL/GL");

var kb = require("knockback");
var ko = require("knockout");


declare class Store {
    constructor(name: string);
}
// Create a module to hide our private implementation details 

export class Person extends Backbone.Model {
    defaults() {
        return {
            id: null,
            Name : "",
            FName : ""
        }
    }
};

export class Persons extends Backbone.Collection {
    localStorage: any;
    constructor() {
        this.model = Person;
        this.localStorage = new Store("Persons");
        super();
    }
    
};

export class PersonViewModel extends GL.ViewModel {

    Update() {
        //Some code to post data to server and get results
        //You can access the Model as json using self.parentView.model
        this.controller.Call("Save", this.bbModel);
    };

    Error = ko.observable();

    SetDefaultName() {
        if (this.model.Name() == "")
            this.model.Name("Saqib");
        else
            this.model.Name("Sohail");
    }

}
