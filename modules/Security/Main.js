define([
	"namespace",
	"backbone",
    "marionette",
	"jquery",
	"underscore",
    "gl",
    "./Router",
    "./Models",
    "./ViewModels",
    "./Views"
],

function (namespace, Backbone, Marionette, $, _, GL) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details 
    app.module("Security", function (Security, app, Backbone, Marionette, $, _, namespace) {

        app.addInitializer(function (options) {
            app.Security.User = app.Security.Models.loggedInUser;
            if (localStorage.getItem("loginToken") === null) {
                app.security.show(new Security.Views.NoUserLoggedInView());
            }
            else
            {
                var user = JSON.parse(localStorage.getItem("loginToken"))
                app.Security.Models.loggedInUser = new Security.Models.LoggedInUser(user);
                var view = new Security.Views.UserLoggedInView({
                    model: Security.Models.loggedInUser
                });
                app.security.show(view);

                if (this.returnAddress != "") {
                    _.each(user.AvailableModules, function (module) {
                        module.IsDefault = false;
                    });
                }

                var modules = new Security.Models.Modules(user.AvailableModules);
                Security.UserModules = modules;
                var moduleview = new Security.Views.Modules({ collection: modules });
                app.modules.show(moduleview);
            }

            GL.GetLoginToken = function () {
                if (!(app.Security.Models.loggedInUser.get("LoginToken") != undefined && app.Security.Models.loggedInUser.get("LoginToken") != ""))
                    return "";
                else
                    return app.Security.Models.loggedInUser.get("LoginToken");
            }
        });


    });
    app.Security.startWithParent = false;

    return app.Security;
});
   