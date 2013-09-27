/// <reference path="../../typings/app.d.ts" />
/// <reference path="../../typings/backbone.d.ts" />
/// <reference path="../../typings/require.d.ts" />
// For each js file you need to access from typescript you need an amd-dependency
/// <amd-dependency path="namespace"/>
/// <amd-dependency path="backbone"/>
/// <amd-dependency path="namespace"/>
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="underscore"/> 
/// <amd-dependency path="subroute"/>
/// <amd-dependency path="routefilter"/>
/// <amd-dependency path="knockback"/>
/// <amd-dependency path="knockout"/>

var namespace = require("namespace");
var Backbone = require("backbone");
var Marionette = require("marionette");
var $ = require("jquery");
var _ = require("underscore");
var kb = require("knockback");
var ko = require("knockout");


// Shorthand the application namespace
var app = namespace.app;

// Create a module to hide our private implementation details 

export class Person extends Backbone.Model {
    ID = "";
    Name = "";
    FName = "";
};

export class Persons extends Backbone.Collection {
    model = Person;
};

