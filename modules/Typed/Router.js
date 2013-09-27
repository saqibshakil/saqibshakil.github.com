var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./Views", "./Models", "./ViewModels", "namespace", "backbone", "namespace", "marionette", "jquery", "underscore", "subroute", "routefilter"], function(require, exports, __Views__, __Models__, __ViewModels__) {
    var namespace = require("namespace");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var $ = require("jquery");
    var _ = require("underscore");
    var Views = __Views__;

    var Models = __Models__;

    var ViewModels = __ViewModels__;

    var app = namespace.app;
    var Typed = app.module("Typed");
    var Router = (function (_super) {
        __extends(Router, _super);
        function Router(options) {
            this.Controller = new Controller();
            this.routes = {
                "d/Detail/:id": "LoadDetail",
                "*actions": "home"
            };
                _super.call(this, options);
        }
        Router.prototype.beforeRoute = function (route) {
            this.Controller.InitializeLayout();
            return true;
        };
        return Router;
    })(app.GL.ModuleRouter);
    exports.Router = Router;    
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
            this.persons = new Models.Persons([
                {
                    ID: "0",
                    Name: "Saqib",
                    FName: "Shakil"
                }, 
                {
                    ID: "1",
                    Name: "Talha",
                    FName: "Yousuf"
                }, 
                {
                    ID: "2",
                    Name: "Nouman",
                    FName: "Berlas"
                }, 
                {
                    ID: "3",
                    Name: "Aqeel",
                    FName: "Khandwala"
                }
            ]);
            var grid = new Views.TableView({
                collection: this.persons
            });
            this.Layout.grid.show(grid);
        };
        Controller.prototype.LoadDetail = function (id) {
            var model = _.find(this.persons.models, function (p) {
                return p.attributes.ID === id;
            });
            var viewModel = new ViewModels.PersonViewModel(model);
            viewModel.controller = this;
            var view = new Views.PersonView({
                model: model,
                viewModel: viewModel
            });
            this.DetailView = view;
            this.Layout.detail.show(view);
        };
        Controller.prototype.Save = function () {
            this.Layout.detail.promiseClose();
        };
        Controller.prototype.home = function () {
        };
        return Controller;
    })();    
    Typed.Router = Router;
})
//@ sourceMappingURL=Router.js.map
