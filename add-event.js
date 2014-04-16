var DataSet = require("data-set")

module.exports = addEvent

function addEvent(target, type, handler) {
    var ds = DataSet(target)
    var events = ds[type]

    if (!events) {
        ds[type] = handler
    } else if (Array.isArray(events)) {
        if (events.indexOf(handler) === -1) {
            events.push(handler)
        }
    } else if (events !== handler) {
        ds[type] = [events, handler]
    }
}
