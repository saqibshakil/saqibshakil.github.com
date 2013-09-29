var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../js/libs/GL/GL", "namespace", "backbone", "marionette", "jquery", "underscore", "text!./templates/Main.htm", "text!./templates/templates.htm"], function(require, exports, __GL__) {
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
    var GL = __GL__;

    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView(options) {
            this.template = MainTemplate;
            this.regions = {
                chartdiv: "#chartdiv",
                grid: "#grid",
                detail: {
                    selector: "#detail",
                    regionType: GL.Regions.SubTransitionRegion
                }
            };
                _super.call(this, options);
        }
        return MainView;
    })(Marionette.Layout);
    exports.MainView = MainView;    
    var RowView = (function (_super) {
        __extends(RowView, _super);
        function RowView(options) {
            this.modelEvents = {
                "change": "render"
            };
            this.template = $(Templates).find("#row-template")[0].outerHTML;
                _super.call(this, options);
        }
        return RowView;
    })(GL.Views.ItemView);
    exports.RowView = RowView;    
    var TableView = (function (_super) {
        __extends(TableView, _super);
        function TableView(options) {
            //this.collectionEvents = {
            //    "add remove sort": "render"
            //};
            this.itemView = RowView;
            this.itemViewContainer = "#gridView";
            this.template = ($(Templates).find("#table-template")[0].outerHTML);
                _super.call(this, options);
        }
        return TableView;
    })(Marionette.CompositeView);
    exports.TableView = TableView;    
    ;
    var PersonView = (function (_super) {
        __extends(PersonView, _super);
        function PersonView(options) {
            this.template = ($(Templates).find("#person-update")[0].outerHTML);
                _super.call(this, options);
        }
        return PersonView;
    })(GL.Views.MvvmView);
    exports.PersonView = PersonView;    
    ;
})
//@ sourceMappingURL=Views.js.map
