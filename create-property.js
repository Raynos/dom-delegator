module.exports = createProperty

function createProperty(id, fn) {
    var events = {}
    events[id] = fn
    return events
}
