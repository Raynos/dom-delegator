var Individual = require("individual")

var addEvent = require("./add-event.js")
var listen = require("./listen.js")

var delegatorCache = Individual("__DOM_DELEGATOR_CACHE@7", {})

module.exports = createDelegator

function createDelegator(surface) {
    return Delegator

    function Delegator(opts) {
        opts = opts || {}
        var delegator = delegatorCache[surface.name]

        if (!delegator) {
            delegator = delegatorCache[surface.name] =
                new DOMDelegator(surface)
        }

        if (opts.defaultEvents !== false) {
            surface.allEvents.forEach(function (eventName) {
                delegator.listenTo(eventName)
            })
        }

        return delegator
    }
}

function DOMDelegator(surface) {
    this.target = surface.defaultTarget
    this.surface = surface
    this.events = {}
}

DOMDelegator.prototype.addEventListener = addEvent

DOMDelegator.prototype.listenTo = listenTo

function listenTo(eventName) {
    if (this.events[eventName]) {
        return
    }

    this.events[eventName] = true
    listen(this, this.surface, eventName)
}
