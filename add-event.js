var DataSet = require("data-set")

module.exports = addEvent

function addEvent(id, target, type, handler) {
    var ds = DataSet(target)
    var events = ds[type] || {}
    events[id] = (events[id] || [])

    if (events[id].indexOf(handler) === -1) {
        events[id].push(handler)
    }
    ds[type] = events
}
