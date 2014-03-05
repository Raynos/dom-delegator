var getField = require("./symbol/get-field.js")
var setField = require("./symbol/set-field.js")

module.exports = addEvent

function addEvent(id, target, type, fn) {
    var events = getField(target, id)
    events[type] = typeof fn === "function" ?
        { handleEvent: fn } : fn

    setField(target, id, events)
}
