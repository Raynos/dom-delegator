var test = require("tape")
var setImmediate = require("timers").setImmediate
var document = require("global/document")

var h = require("./lib/h.js")
var createEvent = require("./lib/create-event.js")

var addEvent = require("../add-event.js")
var Delegator = require("../index.js")

test("adding same function twice", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)

    Delegator()
    var values = []

    var fn = function (ev) {
        values.push(ev)
    }
    
    addEvent(elem, "click", fn)
    addEvent(elem, "click", fn)

    var ev = createEvent("click")
    elem.dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(values.length, 1)
        assert.equal(values[0] && values[0].target, elem)

        document.body.removeChild(elem)
        assert.end()
    })
})

test("adding same event handler twice", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)

    Delegator()
    var values = []

    var handler = {
        handleEvent: function (ev) {
            values.push(ev)
        }
    }
    
    addEvent(elem, "click", handler)
    addEvent(elem, "click", handler)

    var ev = createEvent("click")
    elem.dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(values.length, 1)
        assert.equal(values[0] && values[0].target, elem)

        document.body.removeChild(elem)
        assert.end()
    })
})
