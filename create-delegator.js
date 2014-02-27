var uuid = require("uuid")

var getListener = require("./get-listener.js")
var createListen = require("./listen.js")

module.exports = createDelegator

function createDelegator(surface) {
    var listen = createListen(surface, getListener)

    return Delegator

    function Delegator(target, opts) {
        if (!surface.is(target)) {
            opts = target
            target = null
        }
        
        target = target || surface.defaultTarget
        opts = opts || {}

        var delegator = {
            id: opts.id || uuid(),
            target: target,
            listenTo: listenTo
        }

        if (opts.defaultEvents !== false) {
            surface.allEvents.forEach(function (eventName) {
                listen(delegator, eventName)
            })
        }

        return delegator

        function listenTo(eventName) {
            listen(delegator, eventName)
        }
    }
}
