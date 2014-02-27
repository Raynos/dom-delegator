var getField = require("./symbol/get-field.js")

module.exports = getListener

function getListener(surface, id, target, type) {
    if (target === null) {
        return null
    }

    var events = getField(target, id)
    var tuple = events && events[type]

    if (!tuple) {
        return getListener(surface, id,
            surface.getParent(target), type)
    }

    return {
        currentTarget: target,
        data: tuple[0],
        sink: tuple[1]
    }
}
