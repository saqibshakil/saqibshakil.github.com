define(["require", "exports", "namespace", "backbone", "marionette", "./Router"], function(require, exports) {
    /// <reference path="../../typings/require.d.ts" />
    // For each js file you need to access from typescript you need an amd-dependency
    /// <amd-dependency path="namespace"/>
    /// <amd-dependency path="backbone"/>
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="./Router"/>
    var namespace = require("namespace");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    // Shorthand the application namespace
    var app = namespace.app;
    // Create a module to hide our private implementation details
    exports.Module = app.module("Typed");
    exports.Module.on("start", function (options) {
        app.addInitializer(function (options) {
        });
    });
    exports.Module.startWithParent = false;
})
//@ sourceMappingURL=Main.js.map
