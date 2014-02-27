var version = require("../package.json").version
var MAJOR = version.split(".")[0]

var PREFIX = "_dom-delegator-events-v" + MAJOR + ".0.0-"

module.exports = PREFIX
