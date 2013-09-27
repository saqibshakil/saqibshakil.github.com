define(["require", "exports", "backbone", "namespace", "marionette", "jquery", "underscore", "knockback", "knockout"], function(require, exports) {
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var $ = require("jquery");
    var _ = require("underscore");
    var kb = require("knockback");
    var ko = require("knockout");
    var PersonViewModel = (function () {
        function PersonViewModel(model) {
            this.model = kb.viewModel(model);
        }
        PersonViewModel.prototype.Update = function () {
            this.controller.Save();
        };
        PersonViewModel.prototype.SetDefaultName = function () {
            this.model.Name("Saqib");
        };
        return PersonViewModel;
    })();
    exports.PersonViewModel = PersonViewModel;    
})
//@ sourceMappingURL=ViewModels.js.map
