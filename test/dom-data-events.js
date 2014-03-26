var test = require("tape")
var setImmediate = require("timers").setImmediate
var document = require("global/document")
var DataSet = require("data-set")

var h = require("./lib/h.js")
var createEvent = require("./lib/create-event.js")

var createProperty = require("../create-property.js")
var Delegator = require("../index.js")

test("setting event listeners with data-set directly", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)

    var d = Delegator(elem)
    var values = []

    DataSet(elem).click = createProperty(d.id, function (ev) {
        values.push(ev)
    })

    var ev = createEvent("click")
    elem.dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(values.length, 1)
        assert.equal(values[0].target, elem)

        document.body.removeChild(elem)
        assert.end()
    })
})
