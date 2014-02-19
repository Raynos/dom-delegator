var document = require("global/document")

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
    addListener: addListener
}

function addListener(target, eventName, listener) {
    target.addEventListener(eventName, listener, true)
}

function isSurface(target) {
    return typeof target.nodeName === "string"
}
