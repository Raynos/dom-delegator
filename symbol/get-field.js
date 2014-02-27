var PREFIX = require("./prefix.js")

module.exports = getField

function getField(target, key) {
    return target[PREFIX + key] || {}
}
