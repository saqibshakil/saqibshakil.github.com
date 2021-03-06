﻿define([
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
    // Shorthand the application namespace
    var app = namespace.app;
    // Create a module to hide our private implementation details
    app.module("Documentation", function (Documentation, app, Backbone, Marionette, $, _, namespace) {
        app.addInitializer(function (options) {
        });
    });
    app.Documentation.startWithParent = false;
    return app.Documentation;
});
//@ sourceMappingURL=Main.js.map
