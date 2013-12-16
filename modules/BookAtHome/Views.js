var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../js/libs/GL/GL", "namespace", "backbone", "marionette", "jquery", "underscore", "metrojs", "text!./Templates/Main.htm", "text!./Templates/FacilityTiles.htm", "text!./Templates/FacilityTile.htm"], function(require, exports, __GL__) {
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
    var GL = __GL__;

    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView(options) {
            this.template = MainTemplate;
            this.regions = {
                detail: {
                    selector: ".BookMain",
                    regionType: GL.Regions.SubTransitionRegion
                }
            };
                _super.call(this, options);
        }
        return MainView;
    })(Marionette.Layout);
    exports.MainView = MainView;    
    var ItemView = (function (_super) {
        __extends(ItemView, _super);
        function ItemView(options) {
            this.modelEvents = {
                "change": "render"
            };
            this.template = TileTemplate;
                _super.call(this, options);
        }
        return ItemView;
    })(GL.Views.ItemView);
    exports.ItemView = ItemView;    
    var GridView = (function (_super) {
        __extends(GridView, _super);
        function GridView(options) {
            this.template = TilesTemplate;
            this.itemView = ItemView;
            this.itemViewContainer = ".tiles";
                _super.call(this, options);
        }
        GridView.prototype.onRender = function () {
            this.$(".live-tile")["liveTile"]();
        };
        GridView.prototype.onBeforeClose = function () {
            this.$(".live-tile")["liveTile"]("stop");
        };
        return GridView;
    })(Marionette.CompositeView);
    exports.GridView = GridView;    
    ;
})
//@ sourceMappingURL=Views.js.map
