define([
    "namespace", 
    "backbone", 
    "marionette", 
    "jquery", 
    "underscore", 
    "./Router", 
    "./Models", 
    "./ViewModels", 
    "./Views"
], function (namespace, Backbone, Marionette, $, _) {
    var app = namespace.app;
    app.module("Docs", function (Docs, app, Backbone, Marionette, $, _, namespace) {
        app.addInitializer(function (options) {
        });
    });
    app.Docs.startWithParent = false;
    return app.Docs;
});
//@ sourceMappingURL=Main.js.map
