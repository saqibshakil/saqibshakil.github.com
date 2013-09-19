/// <reference path="../../typings/require.d.ts" />
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
    app.module("Documentation", function (Documentation, app, Backbone, Marionette, $, _) {

        Documentation.Controller = {


            Documentation: function (document) {
                
                require(["text!../modules/Documentation/templates/" + document + ".htm"], doc => {
                    var view = Marionette.ItemView.extend({
                        template: doc
                    });
                    this.DeferUntilLayoutShown(this.Layout.content, new view());
                });
                
                
            },

        };

        Documentation.Router = Backbone.SubRoute.extend(
        $.extend(true,
        {

            initialize: function (options) {
                this.options = options;
            },

            routes: {
                "d/:document": "Documentation",
                "*else": "gotoHome"

            },

            before: function () {
                //this.initializeLayout();
                if (!this.Layout || this.Layout.isClosed) {
                    this.Layout = new Documentation.Views.MainLayout();
                    app.content.show(this.Layout);
                }
                return true;
            },
            /*
            * Change the active element in the topbar 
            */
            DeferUntilLayoutShown: function (Region, View) {
                var self = this;
                var func = function () {
                    if (self.Layout.isClosed === undefined) {
                        setTimeout(func, 50);
                    }
                    else
                        Region.show(View);
                }

                func();
            },

            gotoHome: function (route) {
            }

        }, Documentation.Controller));




    });

});