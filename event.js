var DELIMINATOR = require("./constants/deliminator.js")
var ID_SEPERATOR = require("./constants/id-seperator.js")

module.exports = event

function event(sink, data) {
    return sink.key + ID_SEPERATOR + sink.id + DELIMINATOR +
        JSON.stringify(data)
}
