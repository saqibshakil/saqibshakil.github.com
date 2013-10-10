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


////Jasmine Test
describe("ViewModel", function () {
    var Models = exports;
    var controller, model, viewModel;

    beforeEach(function () {
        controller = new GL.Controller();
        controller.Save = function () { };
        model = new Models.Person();
        viewModel = new Models.PersonViewModel(model, controller);
    });

    //ignored
    xit("is Initializable", function () {
        expect(true).toBe(true);
    });

    it("is available", function () {
        expect(exports.PersonViewModel).not.toBeUndefined();
    });


    it("change is reflected in model", function () {
        viewModel.model.FName("Saqib");
        expect(model.get("FName")).toBe("Saqib");
    });
    describe("Model", function () {
        it("is working well for Set Default name", function () {
            viewModel.model.Name("Talha");
            expect(model.get("Name")).toBe("Talha");
            viewModel.SetDefaultName();
            expect(model.get("Name")).toBe("Sohail");
        });

        it("reflects change from the model", function () {
            model.set("FName", "Shakil");
            expect(viewModel.model.FName()).toBe("Shakil");
        });
    });

    

    
    it("calls controller save on update", function () {
        spyOn(controller,"Save");
        viewModel.Update();
        expect(controller.Save).toHaveBeenCalled();
    });
});

////Qunit Test
//module("ViewModel");
//test("is available", function () {
//    ok(exports.PersonViewModel != undefined);
//});


//test("is Initializable", function () {
//    var controller = {
//        Save: function () {

//        }
//    };

//    var Models = exports;
//    var model = new Models.Person();
//    var viewModel = new Models.PersonViewModel(model, controller);

//    ok(true);
//});

//test("change is reflected in model", function () {
//    var controller = {
//        Save: function () {

//        }
//    };

//    var Models = exports;
//    var model = new Models.Person();
//    var viewModel = new Models.PersonViewModel(model, controller);
//    viewModel.model.FName("Saqib");
//    equal(model.get("FName"),"Saqib");
//});

//test("reflects change from the model", function () {
//    var controller = {
//        Save: function () {

//        }
//    };

//    var Models = exports;
//    var model = new Models.Person();
//    var viewModel = new Models.PersonViewModel(model, controller);
//    model.set("FName", "Shakil");
//    equal(viewModel.model.FName(), "Shakil");
//});
