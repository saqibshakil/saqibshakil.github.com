define(["require", "exports", "namespace", "backbone", "marionette", "./Router"], function(require, exports) {
    var namespace = require("namespace");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var app = namespace.app;
    exports.Module = app.module("Typed");
    exports.Module.on("start", function (options) {
        app.addInitializer(function (options) {
        });
    });
    exports.Module.startWithParent = false;
})
//@ sourceMappingURL=Main.js.map
