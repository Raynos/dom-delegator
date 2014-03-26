var Sink = require("event-sinks/sink")

module.exports = createSink

function createSink(id, listener) {
    return new Sink(id, "", listener)
}
