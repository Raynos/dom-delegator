module.exports = getListener

function getListener(map, target, type) {
    if (target === null) {
        return null
    }

    var events = map.get(target)
    var tuple = events && events[type]

    if (!tuple) {
        return getListener(map, target.parentNode, type)
    }

    return {
        currentTarget: target,
        data: tuple[0],
        sink: tuple[1]
    }
}
