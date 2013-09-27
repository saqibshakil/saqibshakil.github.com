
/// <reference path="../../typings/underscore.d.ts" />
/// <reference path="../../typings/marionette.d.ts" />
/// <reference path="../../typings/app.d.ts" />
/// <reference path="../../typings/backbone.d.ts" />
/// <reference path="../../typings/require.d.ts" />
// For each js file you need to access from typescript you need an amd-dependency
/// <amd-dependency path="namespace"/>
/// <amd-dependency path="backbone"/>
/// <amd-dependency path="namespace"/>
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="underscore"/> 
/// <amd-dependency path="text!./templates/Main.htm"/>
/// <amd-dependency path="text!./templates/templates.htm"/>

var namespace = require("namespace");
var Backbone = require("backbone");
var Marionette = require("marionette");
var $ = require("jquery");
var _ = require("underscore");
var MainTemplate = require("text!./templates/Main.htm");
var Templates = require("text!./templates/templates.htm");

// Shorthand the application namespace
var app = namespace.app;
import GL = module("../../js/libs/GL/GL");
// Create a module to hide our private implementation details 
app.module("Typed");


export class MainView extends Marionette.Layout {

    constructor(options?) {
        this.template = MainTemplate;
        this.regions = {
            chartdiv: "#chartdiv",
            grid: "#grid",
            detail: {
                selector: "#detail",
                regionType: app.GL.SubTransitionRegion
            }
        };
        super(options);
    }
   
}

export class RowView extends Marionette.ItemView {
    constructor(options?: any) {
        this.modelEvents = {
            "change": "render"
        };
        this.template = $(Templates).find("#row-template")[0].outerHTML;
        super(options);
    }


}

export class TableView extends GL.Views.CompositeView {
    constructor(options?: any) {
        this.itemView = RowView;
        this.itemViewContainer = "#gridView";
        this.template = $(Templates).find("#table-template")[0].outerHTML;
        super(options);
    }


};

export class PersonView extends app.GL.Views.MvvmView {

    constructor(options?) {
        this.template = $(Templates).find("#person-update")[0].outerHTML;
        super(options);
    }

};