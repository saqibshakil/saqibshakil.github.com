var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../js/libs/GL/GL", "namespace", "backbone", "namespace", "marionette", "jquery", "underscore", "text!./templates/Main.htm", "text!./templates/templates.htm"], function(require, exports, __GL__) {
    var namespace = require("namespace");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var $ = require("jquery");
    var _ = require("underscore");
    var MainTemplate = require("text!./templates/Main.htm");
    var Templates = require("text!./templates/templates.htm");
    var app = namespace.app;
    var GL = __GL__;

    app.module("Typed");
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView(options) {
            this.template = MainTemplate;
            this.regions = {
                chartdiv: "#chartdiv",
                grid: "#grid",
                detail: {
                    selector: "#detail",
                    regionType: app.GL.SubTransitionRegion
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
    })(Marionette.ItemView);
    exports.RowView = RowView;    
    var TableView = (function (_super) {
        __extends(TableView, _super);
        function TableView(options) {
            this.itemView = RowView;
            this.itemViewContainer = "#gridView";
            this.template = $(Templates).find("#table-template")[0].outerHTML;
                _super.call(this, options);
        }
        return TableView;
    })(GL.Views.CompositeView);
    exports.TableView = TableView;    
    ;
    var PersonView = (function (_super) {
        __extends(PersonView, _super);
        function PersonView(options) {
            this.template = $(Templates).find("#person-update")[0].outerHTML;
                _super.call(this, options);
        }
        return PersonView;
    })(app.GL.Views.MvvmView);
    exports.PersonView = PersonView;    
    ;
})
//@ sourceMappingURL=Views.js.map
