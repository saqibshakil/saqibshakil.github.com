define([
    "namespace", 
    "backbone", 
    "marionette", 
    "jquery", 
    "underscore", 
    "./Router", 
    "./Models", 
    "./ViewModels", 
    "./Views", 
    
], function (namespace, Backbone, Marionette, $, _) {
    var app = namespace.app;
    app.module("Documentation", function (Documentation, app, Backbone, Marionette, $, _, namespace) {
        app.addInitializer(function (options) {
        });
    });
    app.Documentation.startWithParent = false;
    return app.Documentation;
});
//@ sourceMappingURL=Main.js.map
