var document = require("global/document")

var allEvents = [
    "blur", "focus", "focusin", "focusout", "load", "resize",
    "scroll", "unload", "click", "dblclick", "mousedown",
    "mouseup", "change", "select", "submit", "keydown",
    "keypress", "keyup", "error", "contextmenu"
]

module.exports = {
    is: isSurface,
    defaultTarget: document.documentElement,
    allEvents: allEvents,
    addListener: addListener,
    getParent: getParent,
    name: "DOMSurface"
}

function addListener(target, eventName, listener) {
    target.addEventListener(eventName, listener, true)
}

function isSurface(target) {
    return target && typeof target.tagName === "string"
}

function getParent(target) {
    return target.parentNode
}
