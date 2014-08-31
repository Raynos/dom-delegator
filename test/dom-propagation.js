var test = require("tape")
var setImmediate = require("timers").setImmediate
var document = require("global/document")

var createEvent = require("./lib/create-event.js")
var h = require("./lib/h.js")

var Delegator = require("../index.js")

test("multiple listeners and propagation", function (assert) {
    var elem = h("div", [
        h("p", [
            h("span")
        ])
    ])
    document.body.appendChild(elem)

    var d = Delegator()
    var tuples = []

    d.addEventListener(elem, "click", onParent)
    d.addEventListener(elem.childNodes[0], "click", onChild)
    d.addEventListener(elem.childNodes[0].childNodes[0],
        "click", onGrandChild)


    var ev = createEvent("click")
    elem.childNodes[0].childNodes[0].dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(tuples.length, 3)
        assert.equal(tuples[0][0], "grandchild")
        assert.equal(tuples[1][0], "child")
        assert.equal(tuples[2][0], "parent")

        assert.equal(tuples[0][1].currentTarget.tagName, "SPAN")
        assert.equal(tuples[1][1].currentTarget.tagName, "P")
        assert.equal(tuples[2][1].currentTarget.tagName, "DIV")

        document.body.removeChild(elem)
        assert.end()
    })

    function onParent(ev) {
        tuples.push(["parent", ev])
    }
    function onChild(ev) {
        tuples.push(["child", ev])
        ev.startPropagation()
    }
    function onGrandChild(ev) {
        tuples.push(["grandchild", ev])
        ev.startPropagation()
    }
})

test("multiple listeners and partial propagation", function (assert) {
    var elem = h("div", [
        h("p", [
            h("span")
        ])
    ])
    document.body.appendChild(elem)

    var d = Delegator()
    var tuples = []

    d.addEventListener(elem, "click", onParent)
    d.addEventListener(elem.childNodes[0], "click", onChild)
    d.addEventListener(elem.childNodes[0].childNodes[0],
        "click", onGrandChild)


    var ev = createEvent("click")
    elem.childNodes[0].childNodes[0].dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(tuples.length, 2)
        assert.equal(tuples[0][0], "grandchild")
        assert.equal(tuples[1][0], "child")

        assert.equal(tuples[0][1].currentTarget.tagName, "SPAN")
        assert.equal(tuples[1][1].currentTarget.tagName, "P")

        document.body.removeChild(elem)
        assert.end()
    })

    function onParent(ev) {
        tuples.push(["parent", ev])
    }
    function onChild(ev) {
        tuples.push(["child", ev])
    }
    function onGrandChild(ev) {
        tuples.push(["grandchild", ev])
        ev.startPropagation()
    }
})

test("multiple listeners and no propagation", function (assert) {
    var elem = h("div", [
        h("p", [
            h("span")
        ])
    ])
    document.body.appendChild(elem)

    var d = Delegator()
    var tuples = []

    d.addEventListener(elem, "click", onParent)
    d.addEventListener(elem.childNodes[0], "click", onChild)
    d.addEventListener(elem.childNodes[0].childNodes[0],
        "click", onGrandChild)


    var ev = createEvent("click")
    elem.childNodes[0].childNodes[0].dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(tuples.length, 1)
        assert.equal(tuples[0][0], "grandchild")

        assert.equal(tuples[0][1].currentTarget.tagName, "SPAN")

        document.body.removeChild(elem)
        assert.end()
    })

    function onParent(ev) {
        tuples.push(["parent", ev])
    }
    function onChild(ev) {
        tuples.push(["child", ev])
    }
    function onGrandChild(ev) {
        tuples.push(["grandchild", ev])
    }
})
