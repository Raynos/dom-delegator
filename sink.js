Sink.prototype.dispatch = dispatch

module.exports = Sink

function Sink(opts) {
    if (!(this instanceof Sink)) {
        return new Sink(opts)
    }

    this.id = opts.id
    this.key = opts.key
    this.broadcast = opts.broadcast
    this.map = opts.map
}

function dispatch(listener, ev) {
    var sink = listener.sink

    sink.broadcast({
        values: [listener.data],
        ev: null
    })
}
