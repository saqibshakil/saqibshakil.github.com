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
var ko = require("knockout");

var namespace = require("namespace");
var Backbone = require("backbone");
var Marionette = require("marionette");
var $ = require("jquery");
var _ = require("underscore");

export module Views{
    export class MvvmView extends Marionette.ItemView
    {
        viewModel: any;
        initialize(options) {
            if (options.viewModel !== undefined) {
                this.viewModel = options.viewModel;
            }
        };
        onShow() {
            this.viewModel.parentView = this;
            ko.applyBindings(this.viewModel, $(this.el)[0]);

        }
        onClose() {
            ko.cleanNode($(this.el)[0]);
        };

    };
    export class CompositeView extends Marionette.CompositeView{
        appendHtml(cv, iv, index) {
            var $container = this.getItemViewContainer(cv);
            $container.append(iv.$el.html());
        }
    }
}

export class ModuleRouter extends Backbone.SubRoute
{
    beforeRoute: any;
    before() {

        var loginToken = "";
        if (GL.GetLoginToken)
            loginToken = GL.GetLoginToken();
        var route = location.hash.replace("#", "");

        if (loginToken == "") {
            this.navigate("/Security/Login/" + route, true);
            return false;
        }
        this.UpdateModel(route.split("/")[0]);
        if (this.beforeRoute)
            return this.beforeRoute(route);


        return true;
    };

    UpdateModel(ModName) {
        if (app.Security.UserModules != null) {
            var collection = app.Security.UserModules;

            var mod = collection.where({ ModName: ModName });
            if (mod.length >= 1)
                mod[0].set("IsSelected", true);
        }

    };


}

export class ModalRegion extends Marionette.Region{
    el:any;
    constructor() {
        this.el = "#modal";
        super();
    }
    initialize() {
        this.on("show", this.showModal, this);
    };

    getEl(selector) {
        var $el = $(selector);
        $el.on("hidden", this.close);
        return $el;
    };

    showModal(view) {
        view.on("close", this.hideModal, this);
        var modalDiv = this.$el.parent().parent().parent();
        modalDiv.modal('show');
        modalDiv.on('hidden.bs.modal', ()=>view.close());

    };

    hideModal() {
        this.$el.parent().parent().parent().modal('hide');
    };
    onClose() {
        this.off("show", this.showModal);
    }

};

export class TransitionRegion extends Marionette.Region{
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
        var self = this;
        this.ensureEl();
        var isViewClosed = view.isClosed || _.isUndefined(view.$el) || this.currentView == undefined;
        var isDifferentView = view !== this.currentView;
        if (isDifferentView) {
            this.promiseClose(view).done(function () {
                self.addBaseAnimate(view);
                self.addTransitionInit(view, self);
                view.render();
                if (isDifferentView || isViewClosed) {
                    self.open(view);
                }
                self.currentView = view;
                view.$el.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                    view.$el.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");
                    self.removeTransitionInit(view);
                });
                setTimeout(() => self.addTransitionIn(view), 1);
                Marionette.triggerMethod.call(self, "show", view);
                Marionette.triggerMethod.call(view, "show");
            });
        }
    }
    promiseClose(view) {
        var self = this;
        var deferred = $.Deferred();
        if (!self.currentView || self.currentView.isClosed) {
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
        if (!self.isTransitionSupported()) {
            self.removeTransitionOut(cView);
            self.close();
            deferred.resolve();
        }
        return deferred.promise();
    }
    isTransitionSupported() {
        var style;
        style = document.documentElement.style;
        return ((style.webkitTransition) !== undefined || (style.MozTransition) !== undefined || (style.OTransition) !== undefined || (style.MsTransition) !== undefined || (style.transition) !== undefined);
    }

};

export class SubTransitionRegion extends TransitionRegion{
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

