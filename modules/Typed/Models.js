var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "namespace", "backbone", "namespace", "marionette", "jquery", "underscore", "subroute", "routefilter", "knockback", "knockout"], function(require, exports) {
    var namespace = require("namespace");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var $ = require("jquery");
    var _ = require("underscore");
    var kb = require("knockback");
    var ko = require("knockout");
    var app = namespace.app;
    var Person = (function (_super) {
        __extends(Person, _super);
        function Person() {
            _super.apply(this, arguments);

            this.ID = "";
            this.Name = "";
            this.FName = "";
        }
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
