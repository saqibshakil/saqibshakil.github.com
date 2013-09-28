define([
    "namespace", 
    "backbone", 
    "subroute", 
    "marionette", 
    "jquery", 
    "underscore", 
    "knockout", 
    
], function (namespace, Backbone, s, Marionette, $, _, ko) {
    var app = namespace.app;
    app.module("GL", function (GL, app, Backbone, Marionette, $, _, namespace, contentTemplate, todoItemTemplate, TodosModule) {
        GL.Views = {
        };
        GL.Views.KnockOutMvvmView = Marionette.ItemView.extend({
            initialize: function (options) {
                if(options.viewModel !== undefined) {
                    this.viewModel = options.viewModel;
                }
            },
            onShow: function () {
                this.viewModel.parentView = this;
                ko.applyBindings(this.viewModel, $(this.el)[0]);
            },
            onClose: function () {
                ko.cleanNode($(this.el)[0]);
            }
        });
        GL.Views.MvvmView = GL.Views.KnockOutMvvmView;
        GL.Post = function (type, data, successCallback, failureCallback, finallyCallback) {
            var token = "";
            if((app.Security.Models.loggedInUser.get("LoginToken") != undefined && app.Security.Models.loggedInUser.get("LoginToken") != "")) {
                ;
            }
            token = app.Security.Models.loggedInUser.get("LoginToken");
            $.ajax({
                type: 'POST',
                url: 'services/Service.svc/Command',
                data: JSON.stringify({
                    LoginToken: token,
                    Command: {
                        UniqueIdentifier: Math.floor((Math.random() * 1000) + 1),
                        CommandName: type,
                        JSON: JSON.stringify(data)
                    }
                }),
                contentType: "application/json; charset=utf-8",
                success: function (d, s, h) {
                    if(d.IsSuccess) {
                        var response = JSON.parse(d.JSON);
                        if(successCallback) {
                            successCallback(response);
                        }
                    } else {
                        if(failureCallback) {
                            failureCallback(d.Message);
                        }
                    }
                    if(finallyCallback) {
                        finallyCallback(d);
                    }
                }
            });
        };
        GL.PostItem = function (type, data, successCallback, failureCallback, finallyCallback) {
            this.type = type;
            this.data = data;
            this.successCallback = successCallback;
            this.failureCallback = failureCallback;
            this.finallyCallback = finallyCallback;
            this.UniqueIdentifier = Math.floor((Math.random() * 1000) + 1);
        };
        GL.BatchPost = function () {
            this.postItems = [];
            this.Add = function (type, data, successCallback, failureCallback, finallyCallback) {
                var item = new GL.PostItem(type, data, successCallback, failureCallback, finallyCallback);
                this.postItems.push(item);
            };
            this.Post = function () {
                _.bindAll(this, 'success', 'respond');
                var token = "";
                if(GL.GetLoginToken) {
                    token = GL.GetLoginToken();
                }
                var commands = [];
                _.each(this.postItems, function (item) {
                    commands.push({
                        UniqueIdentifier: item.UniqueIdentifier,
                        CommandName: item.type,
                        JSON: JSON.stringify(item.data)
                    });
                });
                $.ajax({
                    type: 'POST',
                    url: 'services/Service.svc/Commands',
                    data: JSON.stringify({
                        LoginToken: token,
                        Commands: commands
                    }),
                    contentType: "application/json; charset=utf-8",
                    success: this.success
                });
            };
            this.success = function (dd, s, h) {
                _.each(dd, this.respond);
            };
            this.respond = function (d) {
                var item = _.find(this.postItems, function (e) {
                    return e.type == d.CommandName && e.UniqueIdentifier == d.UniqueIdentifier;
                });
                if(d.IsSuccess) {
                    var response = JSON.parse(d.JSON);
                    if(item.successCallback) {
                        item.successCallback(response);
                    }
                } else {
                    if(item.failureCallback) {
                        item.failureCallback(d.Message);
                    }
                }
                if(item.finallyCallback) {
                    item.finallyCallback(d);
                }
            };
        };
        GL.ModuleRouter = Backbone.SubRoute.extend({
            before: function () {
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
            },
            UpdateModel: function (ModName) {
                if(app.Security.UserModules != null) {
                    var collection = app.Security.UserModules;
                    var mod = collection.where({
                        ModName: ModName
                    });
                    if(mod.length >= 1) {
                        mod[0].set("IsSelected", true);
                    }
                }
            }
        });
        GL.ModalRegion = Backbone.Marionette.Region.extend({
            el: "#modal",
            initialize: function () {
                this.on("show", this.showModal, this);
            },
            getEl: function (selector) {
                var $el = $(selector);
                $el.on("hidden", this.close);
                return $el;
            },
            showModal: function (view) {
                view.on("close", this.hideModal, this);
                this.$el.parent().parent().parent().modal('show');
                this.$el.parent().parent().parent().on('hidden.bs.modal', function () {
                    view.close();
                });
            },
            hideModal: function () {
                this.$el.parent().parent().parent().modal('hide');
            },
            onClose: function () {
                this.off("show", this.showModal);
            }
        });
        GL.TransitionRegion = Backbone.Marionette.Region.extend({
            initialize: function () {
            },
            addBaseAnimate: function (view) {
                var styles = {
                    "-moz-transition": "margin-left .25s, margin-right .25s",
                    "-webkit-transition": "margin-left .25s, margin-right .25s",
                    "-o-transition": "margin-left .25s, margin-right .25s",
                    "-ms-transition": "margin-left .25s, margin-right .25s",
                    "transition": "margin-left .25s, margin-right .25s"
                };
                view.$el.css(styles);
            },
            addTransitionInit: function (view, region) {
                var styles = {
                    "margin-left": (region.$el.width() * -1) + "px",
                    "margin-right": (region.$el.width() * 1) + "px"
                };
                view.$el.css(styles);
            },
            removeTransitionInit: function (view) {
                var styles = {
                    "margin-left": "",
                    "margin-right": ""
                };
                view.$el.css(styles);
            },
            addTransitionIn: function (view) {
                var styles = {
                    "margin-left": "0px",
                    "margin-right": "0px"
                };
                view.$el.css(styles);
            },
            removeTransitionIn: function (view) {
                var styles = {
                    "margin-left": "",
                    "margin-right": ""
                };
                view.$el.css(styles);
            },
            addTransitionOut: function (view) {
                var styles = {
                    "margin-left": (view.$el.parent().width() * 1) + "px",
                    "margin-right": (view.$el.parent().width() * -1) + "px"
                };
                view.$el.css(styles);
            },
            removeTransitionOut: function (view) {
                var styles = {
                    "margin-left": "",
                    "margin-right": ""
                };
                view.$el.css(styles);
            },
            show: function (view) {
                var _this = this;
                this.ensureEl();
                if(this.$el.length === 0) {
                    setTimeout(function () {
                        return _this.show(view);
                    }, 50);
                } else {
                    this.delegatedshow(view);
                }
            },
            delegatedshow: function (view) {
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
                            self.addTransitionIn(view);
                        }, 1);
                        Marionette.triggerMethod.call(self, "show", view);
                        Marionette.triggerMethod.call(view, "show");
                    });
                }
            },
            promiseClose: function (view) {
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
            },
            isTransitionSupported: function () {
                var style;
                style = document.documentElement.style;
                return ((style.webkitTransition) !== undefined || (style.MozTransition) !== undefined || (style.OTransition) !== undefined || (style.MsTransition) !== undefined || (style.transition) !== undefined);
            }
        });
        GL.SubTransitionRegion = GL.TransitionRegion.extend({
            initialize: function () {
            },
            addBaseAnimate: function (view) {
                view.$el.addClass("baseAnimation");
            },
            addTransitionInit: function (view, region) {
                view.$el.addClass("loaded");
            },
            removeTransitionInit: function (view) {
                view.$el.removeClass("loaded");
            },
            addTransitionIn: function (view) {
                view.$el.addClass("ondisplay");
            },
            removeTransitionIn: function (view) {
                view.$el.removeClass("ondisplay");
            },
            addTransitionOut: function (view) {
                view.$el.addClass("unloaded");
            },
            removeTransitionOut: function (view) {
                view.$el.removeClass("unloaded");
            }
        });
        Marionette.Region.prototype.delegatedshow = Marionette.Region.prototype.show;
        Marionette.Region.prototype.show = function (view) {
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
        Backbone.Router.prototype.route = function (route, name, callback) {
            if(!_.isRegExp(route)) {
                route = this._routeToRegExp(route);
            }
            if(_.isFunction(name)) {
                callback = name;
                name = '';
            }
            if(!callback) {
                if(this.Controller) {
                    callback = this.Controller[name];
                }
                callback = this[name];
            }
            var router = this;
            Backbone.history.route(route, function (fragment) {
                var args = router._extractParameters(route, fragment);
                callback && callback.apply(router, args);
                router.trigger.apply(router, [
                    'route:' + name
                ].concat(args));
                router.trigger('route', name, args);
                Backbone.history.trigger('route', router, name, args);
            });
            return this;
        };
        return app.GL;
    });
});
//@ sourceMappingURL=gl.js.map
