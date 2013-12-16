var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../js/libs/GL/GL", "./Views", "./Models", "./Data", "namespace", "backbone", "namespace", "marionette", "underscore"], function(require, exports, __GL__, __Views__, __Models__, __Data__) {
    /// <reference path="../../typings/app.d.ts" />
    /// <reference path="../../typings/backbone.d.ts" />
    /// <reference path="../../typings/require.d.ts" />
    // For each js file you need to access from typescript you need an amd-dependency
    /// <amd-dependency path="namespace"/>
    /// <amd-dependency path="backbone"/>
    /// <amd-dependency path="namespace"/>
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="underscore"/>
    var namespace = require("namespace");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var $ = require("jquery");
    var _ = require("underscore");
    //import Views = module("./Views");
    //import Models = module("./Models");
    var GL = __GL__;

    var Views = __Views__;

    var Models = __Models__;

    var Data = __Data__;

    // Shorthand the application namespace
    var app = namespace.app;
    var BookAtHome = app.module("BookAtHome");
    var FacilityURL = window["cordova"] != undefined ? 'http://saqibshakil.github.io/facilities.js?' : "/facilities.js?";
    // Create a module to hide our private implementation details
    var Router = (function (_super) {
        __extends(Router, _super);
        function Router(options) {
            this.Controller = new Controller();
            this.routes = {
                "*actions": "home"
            };
                _super.call(this, options);
        }
        Router.prototype.beforeRoute = function (route) {
            this.Controller.InitializeLayout();
            return true;
        };
        return Router;
    })(GL.ModuleRouter);
    exports.Router = Router;    
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            _super.apply(this, arguments);

        }
        Controller.prototype.InitializeLayout = function () {
            if((this.Layout !== undefined && this.Layout.isClosed == false)) {
                return;
            }
            this.Layout = new Views.MainView();
            app.content.show(this.Layout);
            var Facilities;
            try  {
                if(localStorage.getItem("Facilities") != undefined) {
                    Facilities = JSON.parse(localStorage.getItem("Facilities"));
                }
            } catch (e) {
                Facilities = Data.Facilities;
            }
            Data.Facilities = Facilities;
        };
        Controller.prototype.home = function () {
            var _this = this;
            $.getJSON(FacilityURL + Math.random() * 1000).done(function (data) {
                _this.Items = new Models.Facilities(data.Facilities);
                localStorage.setItem("Facilities", JSON.stringify(data.Facilities));
            }).fail(function () {
                _this.Items = new Models.Facilities(Data.Facilities);
            }).always(function () {
                var grid = new Views.GridView({
                    collection: _this.Items
                });
                _this.Layout.detail.show(grid);
            });
        };
        return Controller;
    })(GL.Controller);    
    BookAtHome.Router = Router;
})
//@ sourceMappingURL=Router.js.map
