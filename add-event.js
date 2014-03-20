var getField = require("./symbol/get-field.js")
var setField = require("./symbol/set-field.js")

module.exports = addEvent

function addEvent(id, target, type, fn) {
    var events = getField(target, id)

    var handler = typeof fn === "function" ?
        { handleEvent: fn } : fn
    var currentHandler = events[type]

    if (currentHandler) {
        events[type] = new MultiHandler(currentHandler, handler)
    } else {
        events[type] = handler
    }

    setField(target, id, events)
}

function MultiHandler(multi, handler) {
    var handles = multi.handles || [multi]

    this.handles = handles.concat([handler])
}

MultiHandler.prototype.handleEvent = function (ev) {
    this.handles.forEach(function (handler) {
        handler.handleEvent(ev)
    })
}
