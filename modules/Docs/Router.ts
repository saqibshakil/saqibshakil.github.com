declare var define: any;
define([
// Libs
    "namespace",
    "gl",
    "backbone",
    "marionette",
    "jquery",
    "underscore",
    "subroute",
    "routefilter"
],

function (namespace, GL, Backbone, Marionette, $, _) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details 
    app.module("Docs", function (Docs, app, Backbone, Marionette, $, _) {

        Docs.Controller = {


            part: function () {
                
                var view = new Docs.Views.PartView();
                debugger;

                this.LayoutDelay(Docs.Layout, Docs.Layout.content, view);
                
            },

            LayoutDelay: function (Layout, Region, View) {
                var func = function () {
                    if (Layout.isClosed === undefined)
                        setTimeout(func, 50);
                    else
                        Region.show(View);
                }
                func();
            }
        };

        Docs.Router = Backbone.SubRoute.extend(
        $.extend(true,
        {

            initialize: function (options) {
                this.options = options;
            },

            routes: {
                "Part": "part",
                "home": "home",
                "*else": "gotoHome"

            },

            before: function (route) {
                if (!Docs.Layout || Docs.Layout.isClosed) {
                    Docs.Layout = new Docs.Views.MainLayout();
                    app.content.show(Docs.Layout);
                }

                return true;
            },
            /*
            * Change the active element in the topbar 
            */

            gotoHome: function (route) {
            }

        }, Docs.Controller));




    });

});