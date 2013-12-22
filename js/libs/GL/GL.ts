/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/backbone.d.ts" />
/// <reference path="../../../typings/marionette.d.ts" />
/// <reference path="../../../typings/require.d.ts" />
// For each js file you need to access from typescript you need an amd-dependency
/// <amd-dependency path="namespace"/>
/// <amd-dependency path="backbone"/>
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="underscore"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="subroute"/>
/// <amd-dependency path="knockback"/>
var ko = require("knockout");
var kb = require("knockback");

var namespace = require("namespace");
var Backbone = require("backbone");
var Marionette = require("marionette");
var $ = require("jquery");
var _ = require("underscore");
var subroute = require("subroute");

var app = namespace.app;
export module Views {
    export class MvvmView extends Marionette.ItemView {
        viewModel: ViewModel;
        initialize(options) {
            if (options.viewModel !== undefined) {
                this.viewModel = options.viewModel;
                options.model = this.viewModel.model;
            }
        }
        onShow() {
            ko.applyBindings(this.viewModel, this.el);

        }
        onClose() {
            ko.cleanNode($(this.el)[0]);
        }

    };

    export class ItemView extends Marionette.ItemView {
        templateId: string;
        constructor(options?: any) {
            this.tagName = $(this.template).attr("tagName");
            if (this.tagName == null || this.tagName == "")
                this.tagName = $(this.template)[0].nodeName;
            this.className = $(this.template).attr("class");

            super(options);
        }

    }
}

export class ModuleRouter extends Backbone.SubRoute {
    beforeRoute(any) {
        console.log("ModuleRouter.beforeRoute");
        return true;
    }
    before():boolean {
        console.log("ModuleRouter.Before");
        var loginToken = "";
        if (localStorage.getItem("loginToken") != undefined)
            loginToken = localStorage.getItem("loginToken"); 
        var route = location.hash.replace("#", "");

        if (loginToken == "") { 
            this.navigate("/Security/Login/" + route, true);
            return false;
        }
        this.UpdateModel(route.split("/")[0]);
        if (this.beforeRoute)
            return this.beforeRoute(route);


        return true;
    }

    UpdateModel(ModName) {
        if (app.Security.UserModules != null) {
            var collection = app.Security.UserModules;

            var mod = collection.where({ ModName: ModName });
            if (mod.length >= 1)
                mod[0].set("IsSelected", true);
        }

    }


}

export module Regions {
    export class ModalRegion extends Marionette.Region {
        el: any;
        constructor() {
            this.el = "#modal";
            super();
        }
        initialize() {
            this.on.call(this, "show", this.showModal, this);
        }

        getEl(selector) {
            var $el = $(selector);
            $el.on("hidden", this.close);
            return $el;
        }

        showModal(view) {
            view.on("close", this.hideModal, this);
            var modalDiv = this.$el.parent().parent().parent();
            modalDiv.modal('show');
            modalDiv.on('hidden.bs.modal', () => view.close());

        }

        hideModal() {
            this.$el.parent().parent().parent().modal('hide');
        }
        onClose() {
            this.off.call(this, "show", this.showModal, this);
        }

    };

    export class TransitionRegion extends Marionette.Region {
        addBaseAnimate(view) {
            var styles = {
                "-moz-transition": "margin-left .25s, margin-right .25s",
                "-webkit-transition": "margin-left .25s, margin-right .25s",
                "-o-transition": "margin-left .25s, margin-right .25s",
                "-ms-transition": "margin-left .25s, margin-right .25s",
                "transition": "margin-left .25s, margin-right .25s"
            };
            view.$el.css(styles);
        }
        addTransitionInit(view, region) {
            var styles = {
                "margin-left": (region.$el.width() * -1) + "px",
                "margin-right": (region.$el.width() * 1) + "px"
            };
            view.$el.css(styles);
        }
        removeTransitionInit(view) {
            var styles = {
                "margin-left": "",
                "margin-right": ""
            };
            view.$el.css(styles);
        }
        addTransitionIn(view) {
            var styles = {
                "margin-left": "0px",
                "margin-right": "0px"
            };
            view.$el.css(styles);
        }
        removeTransitionIn(view) {
            var styles = {
                "margin-left": "",
                "margin-right": ""
            };
            view.$el.css(styles);
        }
        addTransitionOut(view) {
            var styles = {
                "margin-left": (view.$el.parent().width() * 1) + "px",
                "margin-right": (view.$el.parent().width() * -1) + "px"
            };
            view.$el.css(styles);
        }
        removeTransitionOut(view) {
            var styles = {
                "margin-left": "",
                "margin-right": ""
            };
            view.$el.css(styles);
        }

        transitionEvent = "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd";
        show(view) {
            this.ensureEl();
            if (this.$el.length === 0) {
                setTimeout(() => this.show(view), 50);
            }
            else {
                this.delegatedshow(view);
            }
        }
        delegatedshow(view) {
            this.ensureEl();
            var isViewClosed = view.isClosed || _.isUndefined(view.$el) || this.currentView == undefined;
            var isDifferentView = view !== this.currentView;
            if (isDifferentView) {
                this.promiseClose(view).done(() => {
                    this.addBaseAnimate(view);
                    this.addTransitionInit(view, this);
                    view.render();
                    if (isDifferentView || isViewClosed) {
                        this.open(view);
                    }
                    this.currentView = view;
                    view.$el.on(this.transitionEvent, () => {
                        view.$el.off(this.transitionEvent);
                        this.removeTransitionInit(view);
                    });
                    setTimeout(() => this.addTransitionIn(view), 1);
                    Marionette.triggerMethod.call(this, "show", view);
                    Marionette.triggerMethod.call(view, "show");
                });
            }
        }
        promiseClose(view?) {
            var deferred = $.Deferred();
            if (!this.currentView || this.currentView.isClosed) {
                deferred.resolve();
                return deferred.promise();
            }
            var cView = this.currentView;
            cView.$el.on(this.transitionEvent, () => {
                cView.$el.off(this.transitionEvent);
                this.removeTransitionOut(cView);
                this.close();
                deferred.resolve();
            });
            this.removeTransitionIn(cView);
            this.addTransitionOut(cView);
            if (!this.isTransitionSupported()) {
                this.removeTransitionOut(cView);
                this.close();
                deferred.resolve();
            }
            return deferred.promise();
        }
        closeView() {
            //this.currentView.close();
            this.promiseClose();
        }
        isTransitionSupported() {
            var style;
            style = document.documentElement.style;
            return ((style.webkitTransition) !== undefined || (style.MozTransition) !== undefined || (style.OTransition) !== undefined || (style.MsTransition) !== undefined || (style.transition) !== undefined);
        }

    };

    export class SubTransitionRegion extends TransitionRegion {
        initialize() {
        }
        addBaseAnimate(view) {
            view.$el.addClass("baseAnimation");
        }
        addTransitionInit(view, region) {

            view.$el.addClass("loaded");
        }
        removeTransitionInit(view) {
            view.$el.removeClass("loaded");
        }
        addTransitionIn(view) {
            view.$el.addClass("ondisplay");
        }
        removeTransitionIn(view) {
            view.$el.removeClass("ondisplay");
        }
        addTransitionOut(view) {
            view.$el.addClass("unloaded");
        }
        removeTransitionOut(view) {
            view.$el.removeClass("unloaded");
        }
    };

    if(Marionette.Region.prototype.delegatedshow === undefined)
        Marionette.Region.prototype.delegatedshow = Marionette.Region.prototype.show;
    Marionette.Region.prototype.show =
    function (view) {
        this.ensureEl();
        if (this.$el.length === 0) {
            setTimeout(
                () => this.show(view), 50
                );
        }
        else {
            console.log("delegatedshow");
            this.delegatedshow(view);
        }
    }

    //Backbone.Router.prototype.route = function (route, name, callback) {

    //    if (!_.isRegExp(route)) route = this._routeToRegExp(route);
    //    if (_.isFunction(name)) {
    //        callback = name;
    //        name = '';
    //    }

    //    if (!callback) {
    //        if (this.Controller) {
    //            callback = this.Controller[name];
    //        }
    //        callback = this[name];
    //    }
    //    var router = this;
    //    Backbone.history.route(route, function (fragment) {
    //        var args = router._extractParameters(route, fragment);
    //        callback && callback.apply(router, args);
    //        router.trigger.apply(router, ['route:' + name].concat(args));
    //        router.trigger('route', name, args);
    //        Backbone.history.trigger('route', router, name, args);
    //    });
    //    return this;
    //};

}

export class ViewModel {
    controller: Controller;
    model: any;
    bbModel: Backbone.Model;
    constructor(model: Backbone.Model, controller: any) {
        this.model = kb.viewModel(model);
        this.bbModel = model;
        this.controller = controller;
    }
}

export class Controller {
    Call(funcName: string
        , args1?: any
        , args2?: any
        , args3?: any
        , args4?: any
        , args5?: any
        , args6?: any) {
        this[funcName].call(this
            , args1
            , args2
            , args3
            , args4
            , args5
            , args6);
    }

}
