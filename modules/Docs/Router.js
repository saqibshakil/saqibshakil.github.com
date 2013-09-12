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
    app.module("Docs", function (Docs, app, Backbone, Marionette, $, _) {
        Docs.Controller = {
            part: function () {
                var func = function () {
                    var view = new Docs.Views.PartView();
                    Docs.Layout.content.show(view);
                };
                if(Docs.Layout.isClosed === undefined) {
                    setTimeout(func, 500);
                } else {
                    func();
                }
            }
        };
        Docs.Router = Backbone.SubRoute.extend($.extend(true, {
            initialize: function (options) {
                this.options = options;
            },
            routes: {
                "Part": "part",
                "home": "home",
                "*else": "gotoHome"
            },
            before: function (route) {
                if(!Docs.Layout || Docs.Layout.isClosed) {
                    Docs.Layout = new Docs.Views.MainLayout();
                    app.content.show(Docs.Layout);
                }
                return true;
            },
            gotoHome: function (route) {
            }
        }, Docs.Controller));
    });
});
//@ sourceMappingURL=Router.js.map
