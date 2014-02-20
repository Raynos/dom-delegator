var weakMap = require("weakmap")
var uuid = require("uuid")

var DEFAULT_MAP = weakMap()
DEFAULT_MAP.id = uuid()

module.exports = DEFAULT_MAP
