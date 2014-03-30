var DataSet = require("data-set")

module.exports = addEvent

function addEvent(id, target, type, handler) {
    var ds = DataSet(target)
    var events = ds[type] || {}

    if (!events[id]) {
        events[id] = []
    }

    events[id] = events[id].concat([handler])
    ds[type] = events
}

