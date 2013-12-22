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
    var FacilityURL = 'http://saqibshakil.github.io/facilities.json?';
    // Create a module to hide our private implementation details
    if(BookAtHome.Rnd == undefined) {
        BookAtHome.Rnd = Math.random();
    }
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
                console.log("Facilities loaded from localstorage");
            } catch (e) {
                Facilities = Data.Facilities;
                console.log("Facilities not loaded from localstorage");
            }
            Data.Facilities = Facilities;
        };
        Controller.prototype.home = function () {
            var _this = this;
            console.log("Service Called");
            $.getJSON(FacilityURL + BookAtHome.Rnd * 1000).done(function (data) {
                console.log("Success");
                _this.Items = new Models.Facilities(data.Facilities);
                localStorage.setItem("Facilities", JSON.stringify(data.Facilities));
                console.log("LocalStorage Updated");
            }).fail(function () {
                _this.Items = new Models.Facilities(Data.Facilities);
                console.log("Failure");
            }).always(function () {
                var grid = new Views.GridView({
                    collection: _this.Items
                });
                _this.Layout.detail.show(grid);
                console.log("Rendered");
            });
        };
        return Controller;
    })(GL.Controller);    
    BookAtHome.Router = Router;
})
//@ sourceMappingURL=Router.js.map
