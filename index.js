var Individual = require("individual")

var DOMDelegator = require("./dom-delegator.js")

var delegatorCache = Individual("__DOM_DELEGATOR_CACHE@7", {})
var allEvents = [
    "blur", "change", "click",  "contextmenu", "dblclick",
    "error","focus", "focusin", "focusout", "input", "keydown",
    "keypress", "keyup", "load", "mousedown", "mouseup",
    "resize", "scroll", "select", "submit", "unload",
]

module.exports = Delegator

function Delegator(opts) {
    opts = opts || {}
    var delegator = delegatorCache.delegator

    if (!delegator) {
        delegator = delegatorCache.delegator =
            new DOMDelegator()
    }

    if (opts.defaultEvents !== false) {
        allEvents.forEach(function (eventName) {
            delegator.listenTo(eventName)
        })
    }

    return delegator
}


