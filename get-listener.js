var getField = require("./symbol/get-field.js")

module.exports = getListener

function getListener(surface, id, target, type) {
    if (target === null) {
        return null
    }

    var events = getField(target, id)
    var handler = events && events[type]

    if (!handler) {
        return getListener(surface, id,
            surface.getParent(target), type)
    }

    return {
        currentTarget: target,
        handler: handler
    }
}
