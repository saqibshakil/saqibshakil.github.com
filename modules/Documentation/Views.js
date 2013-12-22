define([
    "gl",
    "namespace",
    "backbone",
    "marionette",
    "jquery",
    "underscore",
    "text!./templates/Main.htm",
    "text!./templates/Menu.htm"
], function (GL, namespace, Backbone, Marionette, $, _, MainTemplate, MenuTemplate) {
    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details
    app.module("Documentation", function (Documentation, app, Backbone, Marionette, $, _, namespace, contentTemplate, todoItemTemplate, TodosModule) {
        Documentation.Views = {};

        Documentation.Views.MainLayout = Marionette.Layout.extend({
            template: MainTemplate,
            regions: {
                menu: "#menu",
                content: {
                    selector: "#content",
                    regionType: GL.SubTransitionRegion
                }
            },
            onRender: function () {
                this.menu.show(new Documentation.Views.Menu());
            }
        });

        Documentation.Views.Menu = Marionette.ItemView.extend({
            template: MenuTemplate
        });
    });
});
