# dom-delegator

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

Decorate elements with delegated events

## Example DOM

```js
var document = require("global/document")
var Delegator = require("dom-delegator")
var addEvent = require("dom-delegator/event")
var h = require("hyperscript")
var uuid = require("uuid")

var prefix = uuid()
var delegator = Delegator(document.body, {
    prefix: prefix
})

var elem = h("div.foo", [
    h("div.bar", "bar"),
    h("span.baz", "baz")
])
var bar = elem.querySelector(".bar")
var baz = elem.querySelector(".baz")
document.body.appendChild(elem)


// either add individual elems
addEvent(bar, {
    prefix: prefix,
    type: "click",
    name: "text-clicked",
    data: { type: "bar" }
})
addEvent(baz, {
    prefix: prefix,
    type: "click",
    name: "text-clicked",
    data: { type: "baz" }
})

// or add multiple
addEvent(elem, {
    prefix: prefix
    ".bar": {
        type: "click",
        name: "text-clicked",
        data: { type: "baz" }      
    } 
    ".baz": {
        type: "click",
        name: "text-clicked",
        data: { type: "baz" }
    }
})

delegator.on("text-clicked", function (data, ev) {
    var elem = ev.currentTarget
    var value = ev.currentValue
    var type = data.type

    console.log("doSomething", elem, value, type)
})
```

## Example data- attributes

```js
var document = require("global/document")
var Delegator = require("dom-delegator")
var h = require("hyperscript")
var uuid = require("uuid")

var prefix = uuid()
var delegator = Delegator(document.body, {
    prefix: prefix
})

var elem = h("div.foo", [
    h("div.bar", { 
        "data-click": "text-clicked:bar"
    }, "bar"),
    h("div.baz", {
        "data-click": "text-clicked:baz"
    }, "baz")
])
document.body.appendChild(elem)

delegator.on("text-clicked", function (data, ev) {
    var elem = ev.currentTarget
    var value = ev.currentValue
    var type = data

    console.log("doSomething", elem, value, type)
})
```

## Example JSONML

```js
var document = require("global/document")
var Delegator = require("dom-delegator")
var dom = require("jsonml-dom")
var Event = require("jsonml-event")
var uuid = require("uuid")

var prefix = uuid()
var delegator = Delegator(document.body, {
    prefix: prefix
})
var event = Event(prefix)

var elem = dom(["div.foo", [
    ["div.bar", { 
        "click": event("text-clicked", { type: "bar" })
    }, "bar"],
    ["div.baz", {
        "click": event("text-clicked", { type: "baz" })
    }, "baz"]
]])
document.body.appendChild(elem)

delegator.on("text-clicked", function (data, ev) {
    var elem = ev.currentTarget
    var value = ev.currentValue
    var type = data.type

    console.log("doSomething", elem, value, type)
})
```

## Installation

`npm install dom-delegator`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/dom-delegator.png
  [2]: https://travis-ci.org/Raynos/dom-delegator
  [3]: https://badge.fury.io/js/dom-delegator.png
  [4]: https://badge.fury.io/js/dom-delegator
  [5]: https://coveralls.io/repos/Raynos/dom-delegator/badge.png
  [6]: https://coveralls.io/r/Raynos/dom-delegator
  [7]: https://gemnasium.com/Raynos/dom-delegator.png
  [8]: https://gemnasium.com/Raynos/dom-delegator
  [9]: https://david-dm.org/Raynos/dom-delegator.png
  [10]: https://david-dm.org/Raynos/dom-delegator
  [11]: https://ci.testling.com/Raynos/dom-delegator.png
  [12]: https://ci.testling.com/Raynos/dom-delegator
