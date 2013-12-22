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
require("subroute");
var Marionette = require("marionette");
var $ = require("jquery");
var _ = require("underscore");
 
import Views = require("./Views");
import Models = require("./Models");
import GL = require("../../js/libs/GL/GL");
// Shorthand the application namespace
var app = namespace.app;
var Typed = app.module("Typed");

// Create a module to hide our private implementation details 


export class Router extends GL.ModuleRouter {
    routes: any;
    private Controller: Controller;  
    constructor(options?: Backbone.RouterOptions) {
        this.Controller = new Controller();
        this.routes = {
            "d/Detail/:id": "LoadDetail",
            "AddNew": "AddNew",
            "*actions": "home" 
        }
        console.log("Type.Router.Constructer");
        super(options);
    }
    
    beforeRoute(route){
        this.Controller.InitializeLayout();
        console.log("Type.Router.BeforeRoute");
        return true;
    }

}


class Controller extends GL.Controller {

    Layout: Views.MainView;
    persons: Models.Persons;
    InitializeLayout() {
        if ((this.Layout !== undefined && this.Layout.isClosed == false)) {
            return;
        }
        console.log("Type.Controller.InitializeLayout");
        var view = new Views.MainView();

        app.content.show(view);
        this.Layout = view;
        this.LoadGrid();
    }

    LoadGrid() {
        if (this.persons == undefined)
            this.persons = new Models.Persons();
        this.persons.fetch();

        var grid = new Views.TableView({ collection: this.persons });

        this.Layout.grid.show(grid);
    }

    LoadDetail(id) {
        var model = this.persons.get(id);

        var viewModel = new Models.PersonViewModel(model, this);

        var view = new Views.PersonView({
            viewModel: viewModel
        });


        app.modal.show(view);

    }

    Save(bbModel: Backbone.Model) {
        bbModel = this.persons.create(bbModel.toJSON());
        this.persons.localStorage.update(bbModel);
        this.Layout.detail.closeView();
    }


    AddNew() {
        var model = new Models.Person();
        var viewModel = new Models.PersonViewModel(model, this);


        var view = new Views.PersonView({
            viewModel: viewModel
        });

        //this.Layout.detail.show(view);
        app.modal.show(view);
    }

    home() {
        console.log("Type.Controller.Home");
    }

}
Typed.Router = Router;




