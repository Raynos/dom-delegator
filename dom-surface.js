var document = require("global/document")
var DataSet = require("data-set")

var allEvents = [
    "blur", "focus", "focusin", "focusout", "load", "resize",
    "scroll", "unload", "click", "dblclick", "mousedown",
    "mouseup", "change", "select", "submit", "keydown",
    "keypress", "keyup", "error", "contextmenu"
]

module.exports = {
    is: isSurface,
    defaultTarget: document,
    allEvents: allEvents,
    addListener: addListener,
    getParent: getParent,
    fetchAttr: fetchAttr
}

function addListener(target, eventName, listener) {
    target.addEventListener(eventName, listener, true)
}

function isSurface(target) {
    return typeof target.nodeName === "string"
}

function getParent(target) {
    return target.parentNode
}

function fetchAttr(target, type) {
    return DataSet(target)[type]
}
