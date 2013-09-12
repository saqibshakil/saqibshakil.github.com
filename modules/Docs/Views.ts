declare var define: any;
define([
// Libs
    "gl",
    "namespace",
    "backbone",
    "marionette",
    "jquery",
    "underscore",

    "text!./templates/Main.htm",
    "text!./templates/menu.htm",
    "text!./templates/Part.htm",

],

function (GL, namespace, Backbone, Marionette, $, _, MainTemplate, MenuTemplate, PartTemplate) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details 
    app.module("Docs", function (Docs, app, Backbone, Marionette, $, _, namespace, contentTemplate, todoItemTemplate, TodosModule) {
        Docs.Views = {};



        Docs.Views.MainLayout = Marionette.Layout.extend({
            template: MainTemplate,
            regions: {
                menu: "#menu",
                content: "#DocsContent"
            },
            onRender: function () {
                this.menu.show(new Docs.Views.MenuView())
            }

        });


        Docs.Views.MenuView = Marionette.ItemView.extend({
            template: MenuTemplate
        });

        Docs.Views.PartView = Marionette.ItemView.extend({
            template: PartTemplate
        });

    });


});