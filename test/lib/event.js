var SinkHandler = require("./sink-handler.js")
var createProperty = require("../../create-property.js")

module.exports = event

function event(sink, data) {
    return createProperty(sink.id, new SinkHandler(sink, data))
}
