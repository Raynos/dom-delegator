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
        events[id] = handler
    }

    ds[type] = events
}

