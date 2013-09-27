var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "namespace", "backbone", "marionette", "jquery", "underscore", "knockout"], function(require, exports) {
    var ko = require("knockout");
    var namespace = require("namespace");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var $ = require("jquery");
    var _ = require("underscore");
    (function (Views) {
        var MvvmView = (function (_super) {
            __extends(MvvmView, _super);
            function MvvmView() {
                _super.apply(this, arguments);

            }
            MvvmView.prototype.initialize = function (options) {
                if(options.viewModel !== undefined) {
                    this.viewModel = options.viewModel;
                }
            };
            MvvmView.prototype.onShow = function () {
                this.viewModel.parentView = this;
                ko.applyBindings(this.viewModel, $(this.el)[0]);
            };
            MvvmView.prototype.onClose = function () {
                ko.cleanNode($(this.el)[0]);
            };
            return MvvmView;
        })(Marionette.ItemView);
        Views.MvvmView = MvvmView;        
        ;
        var CompositeView = (function (_super) {
            __extends(CompositeView, _super);
            function CompositeView() {
                _super.apply(this, arguments);

            }
            CompositeView.prototype.appendHtml = function (cv, iv, index) {
                var $container = this.getItemViewContainer(cv);
                $container.append(iv.$el.html());
            };
            return CompositeView;
        })(Marionette.CompositeView);
        Views.CompositeView = CompositeView;        
    })(exports.Views || (exports.Views = {}));
    var Views = exports.Views;
    var ModuleRouter = (function (_super) {
        __extends(ModuleRouter, _super);
        function ModuleRouter() {
            _super.apply(this, arguments);

        }
        ModuleRouter.prototype.before = function () {
            var loginToken = "";
            if(GL.GetLoginToken) {
                loginToken = GL.GetLoginToken();
            }
            var route = location.hash.replace("#", "");
            if(loginToken == "") {
                this.navigate("/Security/Login/" + route, true);
                return false;
            }
            this.UpdateModel(route.split("/")[0]);
            if(this.beforeRoute) {
                return this.beforeRoute(route);
            }
            return true;
        };
        ModuleRouter.prototype.UpdateModel = function (ModName) {
            if(app.Security.UserModules != null) {
                var collection = app.Security.UserModules;
                var mod = collection.where({
                    ModName: ModName
                });
                if(mod.length >= 1) {
                    mod[0].set("IsSelected", true);
                }
            }
        };
        return ModuleRouter;
    })(Backbone.SubRoute);
    exports.ModuleRouter = ModuleRouter;    
    var ModalRegion = (function (_super) {
        __extends(ModalRegion, _super);
        function ModalRegion() {
            this.el = "#modal";
                _super.call(this);
        }
        ModalRegion.prototype.initialize = function () {
            this.on("show", this.showModal, this);
        };
        ModalRegion.prototype.getEl = function (selector) {
            var $el = $(selector);
            $el.on("hidden", this.close);
            return $el;
        };
        ModalRegion.prototype.showModal = function (view) {
            view.on("close", this.hideModal, this);
            var modalDiv = this.$el.parent().parent().parent();
            modalDiv.modal('show');
            modalDiv.on('hidden.bs.modal', function () {
                return view.close();
            });
        };
        ModalRegion.prototype.hideModal = function () {
            this.$el.parent().parent().parent().modal('hide');
        };
        ModalRegion.prototype.onClose = function () {
            this.off("show", this.showModal);
        };
        return ModalRegion;
    })(Marionette.Region);
    exports.ModalRegion = ModalRegion;    
    ;
    var TransitionRegion = (function (_super) {
        __extends(TransitionRegion, _super);
        function TransitionRegion() {
            _super.apply(this, arguments);

        }
        TransitionRegion.prototype.addBaseAnimate = function (view) {
            var styles = {
                "-moz-transition": "margin-left .25s, margin-right .25s",
                "-webkit-transition": "margin-left .25s, margin-right .25s",
                "-o-transition": "margin-left .25s, margin-right .25s",
                "-ms-transition": "margin-left .25s, margin-right .25s",
                "transition": "margin-left .25s, margin-right .25s"
            };
            view.$el.css(styles);
        };
        TransitionRegion.prototype.addTransitionInit = function (view, region) {
            var styles = {
                "margin-left": (region.$el.width() * -1) + "px",
                "margin-right": (region.$el.width() * 1) + "px"
            };
            view.$el.css(styles);
        };
        TransitionRegion.prototype.removeTransitionInit = function (view) {
            var styles = {
                "margin-left": "",
                "margin-right": ""
            };
            view.$el.css(styles);
        };
        TransitionRegion.prototype.addTransitionIn = function (view) {
            var styles = {
                "margin-left": "0px",
                "margin-right": "0px"
            };
            view.$el.css(styles);
        };
        TransitionRegion.prototype.removeTransitionIn = function (view) {
            var styles = {
                "margin-left": "",
                "margin-right": ""
            };
            view.$el.css(styles);
        };
        TransitionRegion.prototype.addTransitionOut = function (view) {
            var styles = {
                "margin-left": (view.$el.parent().width() * 1) + "px",
                "margin-right": (view.$el.parent().width() * -1) + "px"
            };
            view.$el.css(styles);
        };
        TransitionRegion.prototype.removeTransitionOut = function (view) {
            var styles = {
                "margin-left": "",
                "margin-right": ""
            };
            view.$el.css(styles);
        };
        TransitionRegion.prototype.show = function (view) {
            var _this = this;
            this.ensureEl();
            if(this.$el.length === 0) {
                setTimeout(function () {
                    return _this.show(view);
                }, 50);
            } else {
                this.delegatedshow(view);
            }
        };
        TransitionRegion.prototype.delegatedshow = function (view) {
            var self = this;
            this.ensureEl();
            var isViewClosed = view.isClosed || _.isUndefined(view.$el) || this.currentView == undefined;
            var isDifferentView = view !== this.currentView;
            if(isDifferentView) {
                this.promiseClose(view).done(function () {
                    self.addBaseAnimate(view);
                    self.addTransitionInit(view, self);
                    view.render();
                    if(isDifferentView || isViewClosed) {
                        self.open(view);
                    }
                    self.currentView = view;
                    view.$el.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                        view.$el.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");
                        self.removeTransitionInit(view);
                    });
                    setTimeout(function () {
                        return self.addTransitionIn(view);
                    }, 1);
                    Marionette.triggerMethod.call(self, "show", view);
                    Marionette.triggerMethod.call(view, "show");
                });
            }
        };
        TransitionRegion.prototype.promiseClose = function (view) {
            var self = this;
            var deferred = $.Deferred();
            if(!self.currentView || self.currentView.isClosed) {
                deferred.resolve();
                return deferred.promise();
            }
            var cView = this.currentView;
            cView.$el.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                cView.$el.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");
                self.removeTransitionOut(cView);
                self.close();
                deferred.resolve();
            });
            self.removeTransitionIn(cView);
            self.addTransitionOut(cView);
            if(!self.isTransitionSupported()) {
                self.removeTransitionOut(cView);
                self.close();
                deferred.resolve();
            }
            return deferred.promise();
        };
        TransitionRegion.prototype.isTransitionSupported = function () {
            var style;
            style = document.documentElement.style;
            return ((style.webkitTransition) !== undefined || (style.MozTransition) !== undefined || (style.OTransition) !== undefined || (style.MsTransition) !== undefined || (style.transition) !== undefined);
        };
        return TransitionRegion;
    })(Marionette.Region);
    exports.TransitionRegion = TransitionRegion;    
    ;
    var SubTransitionRegion = (function (_super) {
        __extends(SubTransitionRegion, _super);
        function SubTransitionRegion() {
            _super.apply(this, arguments);

        }
        SubTransitionRegion.prototype.initialize = function () {
        };
        SubTransitionRegion.prototype.addBaseAnimate = function (view) {
            view.$el.addClass("baseAnimation");
        };
        SubTransitionRegion.prototype.addTransitionInit = function (view, region) {
            view.$el.addClass("loaded");
        };
        SubTransitionRegion.prototype.removeTransitionInit = function (view) {
            view.$el.removeClass("loaded");
        };
        SubTransitionRegion.prototype.addTransitionIn = function (view) {
            view.$el.addClass("ondisplay");
        };
        SubTransitionRegion.prototype.removeTransitionIn = function (view) {
            view.$el.removeClass("ondisplay");
        };
        SubTransitionRegion.prototype.addTransitionOut = function (view) {
            view.$el.addClass("unloaded");
        };
        SubTransitionRegion.prototype.removeTransitionOut = function (view) {
            view.$el.removeClass("unloaded");
        };
        return SubTransitionRegion;
    })(TransitionRegion);
    exports.SubTransitionRegion = SubTransitionRegion;    
    ;
})
//@ sourceMappingURL=GL.js.map
