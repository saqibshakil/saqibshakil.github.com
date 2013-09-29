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

export class Person extends Backbone.Model {
    defaults() {
        return {
            id : "",
            Name : "",
            FName : ""
        }
    }
};

export class Persons extends Backbone.Collection {
    model = Person;
};

