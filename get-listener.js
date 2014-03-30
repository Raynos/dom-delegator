var DataSet = require("data-set")

module.exports = getListener

function getListener(surface, id, target, type) {
    if (target === null) {
        return null
    }

    var ds = DataSet(target)
    var handlers = getHandlers(ds[type] || {}, ds.event || {}, id)

    if (!handlers) {
        return getListener(surface, id,
            surface.getParent(target), type)
    }

    return new Listener(target, handlers)
}

function getHandlers(events, allEvents, id) {
    var handler = events.id === id ? events : events[id]
    var allHandler = allEvents.id === id ? allEvents : allEvents[id]

    return !handler && !allHandler ?
        null : [].concat(handler || [], allHandler || [])
}

function Listener(target, handlers) {
    this.currentTarget = target
    this.handlers = handlers
}
