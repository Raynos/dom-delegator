var PREFIX = require("./prefix.js")

module.exports = setField

function setField(target, key, value) {
    Object.defineProperty(target, PREFIX + key, {
        value: value,
        writable: false,
        enumerable: false,
        configurable: true
    })
}
