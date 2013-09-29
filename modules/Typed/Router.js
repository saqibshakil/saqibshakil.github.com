var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./Views", "./Models", "./ViewModels", "../../js/libs/GL/GL", "namespace", "backbone", "namespace", "marionette", "underscore"], function(require, exports, __Views__, __Models__, __ViewModels__, __GL__) {
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
    var Views = __Views__;

    var Models = __Models__;

    var ViewModels = __ViewModels__;

    var GL = __GL__;

    // Shorthand the application namespace
    var app = namespace.app;
    var Typed = app.module("Typed");
    // Create a module to hide our private implementation details
    var Router = (function (_super) {
        __extends(Router, _super);
        function Router(options) {
            this.Controller = new Controller();
            this.routes = {
                "d/Detail/:id": "LoadDetail",
                "AddNew": "AddNew",
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
    /*
    * Change the active element in the topbar
    */
    var Controller = (function () {
        function Controller() { }
        Controller.prototype.InitializeLayout = function () {
            if((this.Layout !== undefined && this.Layout.isClosed == false)) {
                return;
            }
            var view = new Views.MainView();
            app.content.show(view);
            this.Layout = view;
            this.LoadGrid();
        };
        Controller.prototype.LoadGrid = function () {
            if(this.persons == undefined) {
                this.persons = new Models.Persons([
                    {
                        id: "0",
                        Name: "Saqib",
                        FName: "Shakil"
                    }, 
                    {
                        id: "1",
                        Name: "Talha",
                        FName: "Yousuf"
                    }, 
                    {
                        id: "2",
                        Name: "Nouman",
                        FName: "Berlas"
                    }, 
                    {
                        id: "3",
                        Name: "Aqeel",
                        FName: "Khandwala"
                    }
                ]);
            }
            var grid = new Views.TableView({
                collection: this.persons
            });
            this.Layout.grid.show(grid);
        };
        Controller.prototype.LoadDetail = function (id) {
            var model = _.find(this.persons.models, function (p) {
                return p.id == id;
            });
            var viewModel = new ViewModels.PersonViewModel(model);
            viewModel.controller = this;
            var view = new Views.PersonView({
                model: model,
                viewModel: viewModel
            });
            this.Layout.detail.show(view);
        };
        Controller.prototype.Save = function (bbModel) {
            if(bbModel.isNew() || bbModel.id == "") {
                var maxID;
                maxID = _.max(this.persons.models, function (p) {
                    return p.id;
                }).id * 1;
                bbModel.set("id", maxID + 1);
                this.persons.add(bbModel);
            }
            this.Layout.detail.closeView();
        };
        Controller.prototype.AddNew = function () {
            var model = new Models.Person();
            var viewModel = new ViewModels.PersonViewModel(model);
            viewModel.controller = this;
            var view = new Views.PersonView({
                model: model,
                viewModel: viewModel
            });
            this.Layout.detail.show(view);
        };
        Controller.prototype.home = function () {
        };
        return Controller;
    })();    
    Typed.Router = Router;
})
//@ sourceMappingURL=Router.js.map
