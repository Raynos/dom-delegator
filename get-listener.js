var DataSet = require("data-set")

var multipleEvents = require("./multiple-events.js")

module.exports = getListener

function getListener(surface, id, target, type) {
    if (target === null) {
        return null
    }

    var ds = DataSet(target)
    var events = ds[type]
    var allEvents = ds.event

    var handler = events && events[id]
    var allHandler = allEvents && allEvents[id]

    if (!handler && !allHandler) {
        return getListener(surface, id,
            surface.getParent(target), type)
    }

    if (handler && allHandler) {
        handler = multipleEvents(handler, allHandler)
    }
    handler = handler || allHandler

    if (typeof handler === "function") {
        handler = new EventHandler(handler)
    }

    return new Listener(target, handler)
}

function EventHandler(fn) {
    this.handleEvent = fn
}

function Listener(target, handler) {
    this.currentTarget = target
    this.handler = handler
}
