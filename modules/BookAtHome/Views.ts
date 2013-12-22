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
/// <amd-dependency path="metrojs"/> 
/// <amd-dependency path="text!./Templates/Main.htm"/>
/// <amd-dependency path="text!./Templates/FacilityTiles.htm"/>
/// <amd-dependency path="text!./Templates/FacilityTile.htm"/>

var Backbone = require("backbone");
var Marionette = require("marionette");
var $ = require("jquery");
var _ = require("underscore");
var MainTemplate = require("text!./Templates/Main.htm");
var TilesTemplate = require("text!./Templates/FacilityTiles.htm");
var TileTemplate = require("text!./Templates/FacilityTile.htm");

import GL = require("../../js/libs/GL/GL");


export class MainView extends Marionette.Layout {
    detail: GL.Regions.SubTransitionRegion;

    constructor(options?) {
        this.template = MainTemplate;
        this.regions = { 
            detail: {
                selector: ".BookMain",
                regionType: GL.Regions.SubTransitionRegion
            }
        };
        super(options);
    }
   
}

export class ItemView extends GL.Views.ItemView {
    events: any;
    constructor(options?: any) {
        this.modelEvents = {
            "change": "render"
        };

        this.template = TileTemplate;
        super(options);
    }

}


export class GridView extends Marionette.CompositeView {
    
    
    constructor(options?: any) {
        this.template = TilesTemplate;
        this.itemView = ItemView;
        this.itemViewContainer = ".tiles";
    
        super(options);
    }

    onRender() {
        this.$(".live-tile")["liveTile"]();
    }

    onBeforeClose() {
        this.$(".live-tile")["liveTile"]("stop");
    }


};
