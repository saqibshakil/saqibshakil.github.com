var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./Views", "./Models", "../../js/libs/GL/GL", "namespace", "backbone", "namespace", "marionette", "underscore"], function(require, exports, __Views__, __Models__, __GL__) {
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
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            _super.apply(this, arguments);

        }
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
                this.persons = new Models.Persons();
            }
            this.persons.fetch();
            var grid = new Views.TableView({
                collection: this.persons
            });
            this.Layout.grid.show(grid);
        };
        Controller.prototype.LoadDetail = function (id) {
            var model = this.persons.get(id);
            var viewModel = new Models.PersonViewModel(model, this);
            var view = new Views.PersonView({
                viewModel: viewModel
            });
            this.Layout.detail.show(view);
        };
        Controller.prototype.Save = function (bbModel) {
            bbModel = this.persons.create(bbModel.toJSON());
            this.persons.localStorage.update(bbModel);
            this.Layout.detail.closeView();
            app.Router.navigate("", false);
        };
        Controller.prototype.AddNew = function () {
            var model = new Models.Person();
            var viewModel = new Models.PersonViewModel(model, this);
            var view = new Views.PersonView({
                viewModel: viewModel
            });
            //this.Layout.detail.show(view);
            app.modal.show(view);
        };
        Controller.prototype.home = function () {
        };
        return Controller;
    })(GL.Controller);    
    Typed.Router = Router;
})
//@ sourceMappingURL=Router.js.map
