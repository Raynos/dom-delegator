module.exports = createListen

function createListen(surface, getListener) {
    return listen

    function listen(delegator, eventName) {
        var target = delegator.target
        var id = delegator.id

        surface.addListener(target, eventName, function (ev) {
            var listener = getListener(surface, id, ev.target, eventName)

            if (!listener) {
                return
            }

            listener.sink.dispatch(listener, ev)
        })
    }

}
