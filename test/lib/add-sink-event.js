var addEvent = require("../../add-event.js")
var SinkHandler = require("./sink-handler.js")

module.exports = addSinkEvent

function addSinkEvent(elem, eventName, sink, data) {
    return addEvent(elem, eventName,
        new SinkHandler(sink, data))
}
