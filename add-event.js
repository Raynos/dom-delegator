var DataSet = require("data-set")

var multipleEvents = require("./multiple-events.js")

module.exports = addEvent

function addEvent(id, target, type, fn) {
    var ds = DataSet(target)
    var events = ds[type] || {}
    var handler = fn

    var currentHandler = events[id]

    if (currentHandler) {
        events[id] = multipleEvents(currentHandler, handler)
    } else {
        events[id] = typeof handler === "function" ?
            new EventHandler(handler) : handler
    }

    ds[type] = events
}

function EventHandler(fn) {
    this.handleEvent = fn
}
