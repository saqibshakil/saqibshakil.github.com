define([
    // Libs
    "underscore", 
    "marionette"
], // Namespace the application to provide a mechanism for having application wide
// code without having to pollute the global namespace
function (_, Marionette) {
    return {
        app: // Keep active application instances namespaced under an app object.
        new Marionette.Application(),
        module: // Create a custom module object
        function (additionalProps) {
            return _.extend({
            }, additionalProps);
        },
        todoFilter: // Which filter are we using?
        "",
        ENTER_KEY: // empty, active, completed
        // What is the enter key constant?
        13
    };
});
//@ sourceMappingURL=namespace.js.map
