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
import GL = require("../../js/libs/GL/GL");
import Views = require("./Views");
import Models = require("./Models");
import Data = require("./Data");
// Shorthand the application namespace
var app = namespace.app;
var BookAtHome = app.module("BookAtHome");
var FacilityURL = 'http://saqibshakil.github.io/facilities.json?';
// Create a module to hide our private implementation details 
if (BookAtHome.Rnd == undefined)
    BookAtHome.Rnd = Math.random();

export class Router extends GL.ModuleRouter {
    routes: any;
    private Controller: Controller;
    constructor(options?: Backbone.RouterOptions) {
        this.Controller = new Controller();
        this.routes = {
            "*actions": "home"
        }

        super(options);
    }
    beforeRoute(route) {
        this.Controller.InitializeLayout();
        return true;
    }


}


class Controller extends GL.Controller {

    Layout: Views.MainView;
    Items: Backbone.Collection;
    InitializeLayout() {
        if ((this.Layout !== undefined && this.Layout.isClosed == false)) {
            return;
        }
        this.Layout = new Views.MainView();
        app.content.show(this.Layout);
        var Facilities;
        try {
            if (localStorage.getItem("Facilities") != undefined)
                Facilities = JSON.parse(localStorage.getItem("Facilities"));
            console.log("Facilities loaded from localstorage")
        }
        catch (e)
        {
            Facilities = Data.Facilities;
            console.log("Facilities not loaded from localstorage")
        }
        Data.Facilities = Facilities;
    }


    home() {
        console.log("Service Called");
        $.getJSON(FacilityURL + BookAtHome.Rnd *1000)
        .done((data) => {
            console.log("Success");
            this.Items = new Models.Facilities(data.Facilities);
            localStorage.setItem("Facilities", JSON.stringify(data.Facilities));
            console.log("LocalStorage Updated");
        })
        .fail(() => {
            this.Items = new Models.Facilities(Data.Facilities);
            console.log("Failure");
        }).always(() => {
            var grid = new Views.GridView({
                collection: this.Items
            });
            this.Layout.detail.show(grid);
            console.log("Rendered");
        });
        
    }

}
BookAtHome.Router = Router;




