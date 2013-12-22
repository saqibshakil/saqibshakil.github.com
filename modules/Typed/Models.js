/// <reference path="../../typings/app.d.ts" />
/// <reference path="../../typings/backbone.d.ts" />
/// <reference path="../../typings/require.d.ts" />
// For each js file you need to access from typescript you need an amd-dependency
/// <amd-dependency path="backbone"/>
/// <amd-dependency path="localstorage"/>
/// <amd-dependency path="knockback"/>
/// <amd-dependency path="knockout"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../js/libs/GL/GL", "backbone", "localstorage", "knockback", "knockout"], function(require, exports, GL) {
    var Backbone = require("backbone");

    var kb = require("knockback");
    var ko = require("knockout");

    // Create a module to hide our private implementation details
    var Person = (function (_super) {
        __extends(Person, _super);
        function Person() {
            _super.apply(this, arguments);
        }
        Person.prototype.defaults = function () {
            return {
                id: null,
                Name: "",
                FName: ""
            };
        };
        return Person;
    })(Backbone.Model);
    exports.Person = Person;
    ;

    var Persons = (function (_super) {
        __extends(Persons, _super);
        function Persons() {
            this.model = Person;
            this.localStorage = new Store("Persons");
            _super.call(this);
        }
        return Persons;
    })(Backbone.Collection);
    exports.Persons = Persons;
    ;

    var PersonViewModel = (function (_super) {
        __extends(PersonViewModel, _super);
        function PersonViewModel() {
            _super.apply(this, arguments);
            this.Error = ko.observable();
        }
        PersonViewModel.prototype.Update = function () {
            //Some code to post data to server and get results
            //You can access the Model as json using self.parentView.model
            this.controller.Call("Save", this.bbModel);
        };

        PersonViewModel.prototype.SetDefaultName = function () {
            if (this.model.Name() == "")
                this.model.Name("Saqib");
            else
                this.model.Name("Sohail");
        };
        return PersonViewModel;
    })(GL.ViewModel);
    exports.PersonViewModel = PersonViewModel;
});
