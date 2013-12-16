var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "backbone", "localstorage", "knockback", "knockout"], function(require, exports) {
    /// <reference path="../../typings/app.d.ts" />
    /// <reference path="../../typings/backbone.d.ts" />
    /// <reference path="../../typings/require.d.ts" />
    // For each js file you need to access from typescript you need an amd-dependency
    /// <amd-dependency path="backbone"/>
    /// <amd-dependency path="localstorage"/>
    /// <amd-dependency path="knockback"/>
    /// <amd-dependency path="knockout"/>
    var Backbone = require("backbone");
    
    var kb = require("knockback");
    var ko = require("knockout");
    
    // Create a module to hide our private implementation details
    var Facility = (function (_super) {
        __extends(Facility, _super);
        function Facility() {
            _super.apply(this, arguments);

        }
        Facility.prototype.defaults = function () {
            return {
                id: null,
                dataSpeed: "750",
                dataDelay: (Math.floor(Math.random() * 2000) + 2000).toString(),
                dataMode: "carousal",
                dataDirection: "horizontal",
                tileTitle: "",
                largeTitle: "",
                color: "blue",
                Images: [
                    {
                        Src: "dummy.jpg",
                        Title: "",
                        Accent: true
                    }
                ]
            };
        };
        return Facility;
    })(Backbone.Model);
    exports.Facility = Facility;    
    ;
    var Facilities = (function (_super) {
        __extends(Facilities, _super);
        function Facilities(options) {
            this.model = Facility;
            //this.url = "http://saqibshakil.github.io/api/Facilities.js";
                _super.call(this, options);
        }
        return Facilities;
    })(Backbone.Collection);
    exports.Facilities = Facilities;    
    ;
})
//@ sourceMappingURL=Models.js.map
