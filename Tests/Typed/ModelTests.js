/// <reference path="../definemocked.js" />
/// <reference path="../../js/libs/underscore/underscore.js" />
/// <reference path="../../js/libs/backbone/backbone.js" />
/// <reference path="../../js/libs/backbone.subroute/backbone-subroute.js" />
/// <reference path="../../js/libs/backbone.localstorage/backbone.localstorage-1.0.js" />
/// <reference path="../../js/libs/knockout/knockout.js" />
/// <reference path="../../js/libs/knockout/knockback.js" />
/// <reference path="../../js/libs/jquery/jquery-1.8.0.js" />
/// <reference path="../../js/libs/backbone.marionette/backbone.marionette.js" />
/// <reference path="../deps.js" />
/// <reference path="../../js/libs/GL/GL.js" />
/// <reference path="ModelDep.js" />
/// <reference path="../../modules/Typed/Models.js" />


module("ViewModel");
test("is available", function () {
    ok(exports.PersonViewModel != undefined);
});


test("is Initializable", function () {
    var controller = {
        Save: function () {

        }
    };
    
    var Models = exports;
    var model = new Models.Person();
    var viewModel = new Models.PersonViewModel(model, controller);
    
    ok(true);
});

test("change is reflected in model", function () {
    var controller = {
        Save: function () {

        }
    };

    var Models = exports;
    var model = new Models.Person();
    var viewModel = new Models.PersonViewModel(model, controller);
    viewModel.model.FName("Saqib");
    equal(model.get("FName"),"Saqib");
});

test("reflects change from the model", function () {
    var controller = {
        Save: function () {

        }
    };

    var Models = exports;
    var model = new Models.Person();
    var viewModel = new Models.PersonViewModel(model, controller);
    model.set("FName", "Shakil");
    equal(viewModel.model.FName(), "Shakil");
});

