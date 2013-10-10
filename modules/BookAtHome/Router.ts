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
import GL = module("../../js/libs/GL/GL");
import Views = module("./Views");
import Models = module("./Models");
import Data = module("./Data");
// Shorthand the application namespace
var app: app = namespace.app;
var BookAtHome = app.module("BookAtHome");

// Create a module to hide our private implementation details 


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
        if (this.Items == undefined)
            this.Items = new Models.Facilities(Data.Facilities);
    }


    home() {


        var grid = new Views.GridView({
            collection: this.Items
        });
        this.Layout.detail.show(grid);

        
    }

}
BookAtHome.Router = Router;




