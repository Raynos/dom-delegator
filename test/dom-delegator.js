var test = require("tape")
var setImmediate = require("timers").setImmediate
var document = require("global/document")

var h = require("./lib/h.js")
var createEvent = require("./lib/create-event.js")

var addEvent = require("../add-event.js")
var Delegator = require("../index.js")

test("delegator with no args", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)

    Delegator()
    var values = []
    
    addEvent(elem, "click", function (ev) {
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

test("delegator with addEventListener", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)

    var d = Delegator()
    var values = []
    
    d.addEventListener(elem, "click", function (ev) {
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

test("delegator with no args", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)

    var d = Delegator({
        defaultEvents: false
    })
    d.listenTo("click")
    var values = []
    
    addEvent(elem, "click", function (ev) {
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
