/// <reference path="../../typings/app.d.ts" />
/// <reference path="../../typings/backbone.d.ts" />
/// <reference path="../../typings/require.d.ts" />
// For each js file you need to access from typescript you need an amd-dependency
/// <amd-dependency path="namespace"/>
/// <amd-dependency path="backbone"/>
/// <amd-dependency path="namespace"/>
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="underscore"/> 
/// <amd-dependency path="subroute"/>
/// <amd-dependency path="routefilter"/>


var namespace = require("namespace");
var Backbone = require("backbone");
var Marionette = require("marionette");
var $ = require("jquery");
var _ = require("underscore");

import Views = module("./Views");
import Models = module("./Models");
import ViewModels = module("./ViewModels");

// Shorthand the application namespace
var app: app = namespace.app;
var Typed = app.module("Typed");

// Create a module to hide our private implementation details 


export class Router extends app.GL.ModuleRouter {
    routes: any;
    private Controller: Controller;
    constructor(options?: Backbone.RouterOptions) {
        this.Controller = new Controller();
        this.routes = {
            "d/Detail/:id": "LoadDetail",
            "*actions": "home"
        }

        super(options);
    }
    beforeRoute(route) {
        this.Controller.InitializeLayout();
        return true;
    }
    /*
    * Change the active element in the topbar 
    */

}


class Controller{
    
    Layout: any;
    DetailView: any;
    persons: Models.Persons;
    InitializeLayout() {
        if ((this.Layout !== undefined && this.Layout.isClosed == false)) {
            return;
        }

        var view = new Views.MainView();

        app.content.show(view);
        this.Layout = view;
        this.LoadGrid();
    }

    LoadGrid() {
        this.persons = new Models.Persons(
            [{
                ID: "0",
                Name: "Saqib",
                FName: "Shakil"
            }, {
                ID: "1",
                Name: "Talha",
                FName: "Yousuf"
            }, {
                ID: "2",
                Name: "Nouman",
                FName: "Berlas"
            }, {
                ID: "3",
                Name: "Aqeel",
                FName: "Khandwala"
            }]
        );

        var grid = new Views.TableView({ collection: this.persons });

        this.Layout.grid.show(grid);
    }

    LoadDetail(id) {
        var model = _.find(this.persons.models, (p) => p.attributes.ID === id);
        var viewModel = new ViewModels.PersonViewModel(model);
        viewModel.controller = this;

        var view = new Views.PersonView({
            model: model,
            viewModel: viewModel
        });
        this.DetailView = view;

        this.Layout.detail.show(view)

        //app.modal.show(view);

    }

    Save() {
        //this.DetailView.close()
        this.Layout.detail.promiseClose();
    }

    home() {

    }

}
Typed.Router = Router;




