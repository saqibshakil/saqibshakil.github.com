/// <reference path="../../typings/underscore.d.ts" />
/// <reference path="../../typings/marionette.d.ts" />
/// <reference path="../../typings/app.d.ts" />
/// <reference path="../../typings/backbone.d.ts" />
/// <reference path="../../typings/require.d.ts" />
// For each js file you need to access from typescript you need an amd-dependency
/// <amd-dependency path="namespace"/>
/// <amd-dependency path="backbone"/>
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="underscore"/> 
/// <amd-dependency path="text!./templates/Main.htm"/>
/// <amd-dependency path="text!./templates/templates.htm"/>

var Backbone = require("backbone");
var Marionette = require("marionette");
var $ = require("jquery");
var _ = require("underscore");
var MainTemplate = require("text!./templates/Main.htm");
var Templates = require("text!./templates/templates.htm");

import GL = module("../../js/libs/GL/GL");


export class MainView extends Marionette.Layout {
    chartdiv: Marionette.Region;
    grid: Marionette.Region;
    detail: GL.Regions.SubTransitionRegion;

    constructor(options?) {
        this.template = MainTemplate;
        this.regions = { 
            chartdiv: "#chartdiv",
            grid: "#grid",
            detail: {
                selector: "#detail",
                regionType: GL.Regions.SubTransitionRegion
            }
        };
        super(options);
    }
   
}

export class RowView extends GL.Views.ItemView {
    DisplayAsGrid: bool;
    events: any;
    constructor(options?: any) {
        this.modelEvents = {
            "change": "render"
        };
        this.events = {
            "click .remove": "Remove"
        }
        this.template = $(Templates).find("#row-template")[0].outerHTML;
        super(options);
    }
    Remove() {
        this.model.destroy();
    }

}

export class ItemView extends GL.Views.ItemView {
    DisplayAsGrid: bool;
    events: any;
    constructor(options?: any) {
        this.modelEvents = {
            "change": "render"
        };
        this.events = {
            "click .remove": "Remove"
        }
        this.template = $(Templates).find("#item-template")[0].outerHTML;
        super(options);
    }

    Remove() {
        this.model.destroy();
    }


}

export class TableView extends Marionette.CompositeView {
    DisplayAsGrid: bool;
    events: any;
    constructor(options?: any) {
        this.DisplayAsGrid = true;
        this.itemView = RowView;
        this.itemViewContainer = "#gridView";
        this.events = {
            "click .typeSelector": "SwitchTemplate"
        }
        super(options);
    }

    getItemView(item?: any):any {
        if (this.DisplayAsGrid)
            return ItemView;
        else
            return RowView;
    }

    getTemplate() {
        return this.DisplayAsGrid
            ? ($(Templates).find("#grid-template")[0].outerHTML)
            : ($(Templates).find("#table-template")[0].outerHTML);
        
    }

    SwitchTemplate() {
        this.DisplayAsGrid = !this.DisplayAsGrid;
        this.render();
    }


};

export class PersonView extends GL.Views.MvvmView {

    constructor(options?) {
        this.template = ($(Templates).find("#person-update")[0].outerHTML);
        

        super(options);
    }

};