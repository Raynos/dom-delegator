var Individual = require("individual")
var document = require("global/document")

var addEvent = require("./add-event.js")
var listen = require("./listen.js")

var delegatorCache = Individual("__DOM_DELEGATOR_CACHE@7", {})
var allEvents = [
    "blur", "change", "click",  "contextmenu", "dblclick",
    "error","focus", "focusin", "focusout", "keydown",
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

function DOMDelegator() {
    this.target = document.documentElement
    this.events = {}
}

DOMDelegator.prototype.addEventListener = addEvent

DOMDelegator.prototype.listenTo = listenTo

function listenTo(eventName) {
    if (this.events[eventName]) {
        return
    }

    this.events[eventName] = true
    listen(this, eventName)
}
