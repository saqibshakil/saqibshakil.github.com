define([
// Libs
	"namespace",
	"backbone",
    "marionette",
	"jquery",
	"underscore",
    "subroute",
    "routefilter"
],

function (namespace, Backbone, Marionette, $, _) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Create a module to hide our private implementation details 
    app.module("Security", function (Security, app, Backbone, Marionette, $, _) {
        Security.UserModules = null;

        Security.Controller = {
            returnAddress: "",


            loggedin: function (user) {
                Security.Models.loggedInUser = new Security.Models.LoggedInUser(user);

                var viewModel = new Security.ViewModels.LoginViewModel(Security.Models.loggedInUser);
                viewModel.controller = Security.Controller;
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
                app.modal.close();

                localStorage.setItem("loginToken", JSON.stringify(user));
                if (this.returnAddress != "") {
                    Backbone.history.navigate(this.returnAddress, true);
                }


            },

            login: function () {
                if (localStorage.getItem("loginToken")!=null)
                    return;

                
                var model = new Security.Models.LoginModel({
                    username: "Person1",
                    password: "password"
                });

                var viewModel = new Security.ViewModels.LoginViewModel(model);
                viewModel.controller = this;

                var view = new Security.Views.LoginView({
                    model: model,
                    viewModel: viewModel

                });

                app.content.show(view);

            },

            loginwithcallback: function (route) {
                this.returnAddress = "/" + route;
                this.login();
            },
            logout: function(){
                localStorage.removeItem("loginToken");
                app.security.show(new Security.Views.NoUserLoggedInView());
                app.modules.currentView.close();
                Backbone.history.navigate("/", true);
            }
            


        };

        Security.Router = Backbone.SubRoute.extend(
        $.extend(true,
        {

            initialize: function (options) {
                this.options = options;
                _.bindAll(this, "login", "loginwithcallback", "gotoHome");
            },

            routes: {
                "Login": "login",
                "login": "login",
                "Login/*route": "loginwithcallback",
                "login/*route": "loginwithcallback",
                "Logout": "logout",
                "logout": "logout",
                "*else": "gotoHome"

            },

            before: function (route) {
                //this.initializeLayout();
                console.log("Security.Router.Before");
                return true;
            },
            /*
            * Change the active element in the topbar 
            */

            gotoHome: function (route) {
                
            }

        }, Security.Controller));




    });

});