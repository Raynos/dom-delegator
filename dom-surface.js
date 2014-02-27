var document = require("global/document")

var getListener = require("./get-listener.js")

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
    getListener: getListener
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
