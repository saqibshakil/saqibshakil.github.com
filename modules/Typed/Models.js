var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "namespace", "backbone"], function(require, exports) {
    /// <reference path="../../typings/app.d.ts" />
    /// <reference path="../../typings/backbone.d.ts" />
    /// <reference path="../../typings/require.d.ts" />
    // For each js file you need to access from typescript you need an amd-dependency
    /// <amd-dependency path="namespace"/>
    /// <amd-dependency path="backbone"/>
    var namespace = require("namespace");
    var Backbone = require("backbone");
    // Shorthand the application namespace
    var app = namespace.app;
    // Create a module to hide our private implementation details
    var Person = (function (_super) {
        __extends(Person, _super);
        function Person() {
            _super.apply(this, arguments);

        }
        Person.prototype.defaults = function () {
            return {
                id: "",
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
            _super.apply(this, arguments);

            this.model = Person;
        }
        return Persons;
    })(Backbone.Collection);
    exports.Persons = Persons;    
    ;
})
//@ sourceMappingURL=Models.js.map
