var test = require("tape")
var setImmediate = require("timers").setImmediate
var document = require("global/document")

var h = require("./lib/h.js")
var createEvent = require("./lib/create-event.js")

var addEvent = require("../add-event.js")
var Delegator = require("../index.js")

test("dispatched events have correct targets", function (assert) {
    var elem = h("div", [ h("div") ])
    document.body.appendChild(elem)

    Delegator()
    var values = []
    
    addEvent(elem, "click", function (ev) {
        values.push(ev)
    })

    var ev = createEvent("click")
    elem.childNodes[0].dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(values.length, 1)
        assert.equal(values[0].target, elem.childNodes[0])
        assert.equal(values[0].currentTarget, elem)

        document.body.removeChild(elem)
        assert.end()
    })
})

test("dispatch event with no handler", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)

    Delegator()
    var values = []
    
    addEvent(elem, "click", function (ev) {
        values.push(ev)
    })

    var ev = createEvent("keypress")
    elem.dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(values.length, 0)

        document.body.removeChild(elem)
        assert.end()
    })
})
