declare var define:any;
define([
// Libs
	"namespace",
	"backbone",
    "marionette",
	"jquery",
	"underscore",
    
],

function (namespace, Backbone, Marionette, $, _) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details 
    app.module("Docs", function (Docs, app, Backbone, Marionette, $, _, namespace, contentTemplate, todoItemTemplate, TodosModule) {
        Docs.Models = {};

        


    });

});