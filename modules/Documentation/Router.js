define([
    "namespace", 
    "gl", 
    "backbone", 
    "marionette", 
    "jquery", 
    "underscore", 
    "subroute", 
    "routefilter"
], function (namespace, GL, Backbone, Marionette, $, _) {
    var app = namespace.app;
    app.module("Documentation", function (Documentation, app, Backbone, Marionette, $, _) {
        Documentation.Controller = {
            Documentation: function (document) {
                var _this = this;
                require([
                    "text!../modules/Documentation/templates/" + document + ".htm"
                ], function (doc) {
                    var view = Marionette.ItemView.extend({
                        template: doc
                    });
                    _this.DeferUntilLayoutShown(_this.Layout.content, new view());
                });
            }
        };
        Documentation.Router = Backbone.SubRoute.extend($.extend(true, {
            initialize: function (options) {
                this.options = options;
            },
            routes: {
                "d/:document": "Documentation",
                "*else": "gotoHome"
            },
            before: function () {
                if(!this.Layout || this.Layout.isClosed) {
                    this.Layout = new Documentation.Views.MainLayout();
                    app.content.show(this.Layout);
                }
                return true;
            },
            DeferUntilLayoutShown: function (Region, View) {
                var self = this;
                var func = function () {
                    if(self.Layout.isClosed === undefined) {
                        setTimeout(func, 50);
                    } else {
                        Region.show(View);
                    }
                };
                func();
            },
            gotoHome: function (route) {
            }
        }, Documentation.Controller));
    });
});
