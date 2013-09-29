define([
    // Libs
    "namespace", 
    "backbone", 
    "marionette", 
    "jquery", 
    "underscore", 
    "./Models"
], function (namespace, Backbone, Marionette, $, _) {
    // Shorthand the application namespace
    var app = namespace.app;
    // Create a module to hide our private implementation details
    app.module("Documentation", function (Documentation, app, Backbone, Marionette, $, _) {
        Documentation.ViewModels = {
        };
    });
});
//@ sourceMappingURL=ViewModels.js.map
