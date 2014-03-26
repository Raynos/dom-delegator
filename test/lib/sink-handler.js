module.exports = SinkHandler

function SinkHandler(sink, data) {
    if (!(this instanceof SinkHandler)) {
        return new SinkHandler(sink, data)
    }

    this.sink = sink
    this.data = data
}

SinkHandler.prototype.handleEvent = function handleEvent(ev) {
    this.sink.write(this.data)
}
