var getField = require("./symbol/get-field.js")
var setField = require("./symbol/set-field.js")

module.exports = addEvent

function addEvent(target, type, sink, data) {
    var id = sink.id

    var events = getField(target, id)
    sink.dispatch = dispatch
    events[type] = [data, sink]

    setField(target, id, events)
}

function dispatch(listener, ev) {
    var sink = listener.sink

    sink.write({
        value: listener.data,
        ev: null
    })
}
