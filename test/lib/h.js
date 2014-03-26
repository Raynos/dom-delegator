var document = require("global/document")

module.exports = h

function h(tagName, children) {
    var elem = document.createElement(tagName)
    if (children) {
        children.forEach(function (child) {
            elem.appendChild(child)
        })
    }
    return elem
}
