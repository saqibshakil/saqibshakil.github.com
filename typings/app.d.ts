/// <reference path="marionette.d.ts" />
/// <reference path="backbone.d.ts" />
declare module app {
    module GL {
        export class ModuleRouter extends Backbone.Router {

        }
        module Views{
            export class MvvmView extends Marionette.ItemView {
                public controller: any;
            }
        }
    }
    var content: Marionette.Region;
    var modal: Marionette.Region;
    function module(name: string): any;
    var Security: any;
}

declare var GL: any;