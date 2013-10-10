/// <reference path="../../typings/require.d.ts" />
// For each js file you need to access from typescript you need an amd-dependency
/// <amd-dependency path="namespace"/>
/// <amd-dependency path="./Router"/>

var namespace = require("namespace");

// Shorthand the application namespace
var app = namespace.app;

// Create a module to hide our private implementation details 
export var Module = app.module("Typed");
Module.startWithParent = false;



