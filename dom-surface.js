var document = require("global/document")

module.exports = {
    is: isSurface,
    defaultTarget: document
}

function isSurface(target) {
    return typeof target.nodeName === "string"
}
