var exports;
var dep1, dep2, dep3;
function require(name) {
    return dependencies[name];
}
var dependencies = [];

function define(a, func) {
    exports = {};
    func(require, exports, dep1, dep2, dep3);
}