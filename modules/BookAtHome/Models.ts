/// <reference path="../../typings/app.d.ts" />
/// <reference path="../../typings/backbone.d.ts" />
/// <reference path="../../typings/require.d.ts" />
// For each js file you need to access from typescript you need an amd-dependency
/// <amd-dependency path="backbone"/>
/// <amd-dependency path="localstorage"/>
/// <amd-dependency path="knockback"/>
/// <amd-dependency path="knockout"/>

var Backbone = require("backbone");
import GL = require("../../js/libs/GL/GL");

var kb = require("knockback");
var ko = require("knockout");


declare class Store {
    constructor(name: string);
}
// Create a module to hide our private implementation details 

export class Facility extends Backbone.Model {
    defaults() {
        return {
            id: null,
            dataSpeed: "750",
            dataDelay: (Math.floor( Math.random() *2000 )+2000).toString(),
            dataMode: "carousal",
            dataDirection: "horizontal",
            tileTitle: "",
            largeTitle: "",
            color: "blue",
            Images: [{
                Src: "dummy.jpg",
                Title: "",
                Accent: true
                }]
        }
    }
};

export class Facilities extends Backbone.Collection {
    constructor(options?) {
        this.model = Facility;
        //this.url = "http://saqibshakil.github.io/api/Facilities.js";
        super(options);
    }

};

