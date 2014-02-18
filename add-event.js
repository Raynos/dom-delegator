module.exports = addEvent

function addEvent(target, type, sink, data) {
    var map = sink.map

    var events = map.get(target) || {}
    events[type] = [data, sink]

    map.set(target, events)
}
