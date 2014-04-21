type ProxyEvent := DOMEvent & {
    _rawEvent: DOMEvent,
    currentTarget: DOMNode,
    preventDefault: () => void
}

type EventHandler := Function<ProxyEvent> | {
    handleEvent: Function<ProxyEvent>
}

type Delegator := {
    target: DOMNode,
    listenTo: (eventName: String) => void,
    unlistenTo: (eventName: String) => void,
    addEventListener: (DOMNode, String, EventHandler),
    removeEventListener: (DOMNode, String, EventHandler),
    addGlobalEventListener: (String, EventHandler),
    removeGlobalEventListener: (String, EventHandler)
}

dom-delegator := (opts?: {
    defaultEvents?: Boolean
}) => Delegator

dom-delegator/dom-delegator := () => Delegator

dom-delegator/add-event := (
    target: DOMNode,
    type: String,
    fn: EventHandler
) => void

dom-delegator/proxy-event := (DOMEvent) => ProxyEvent

dom-delegator/remove-event := (
    target: DOMNode,
    type: String,
    fn: EventHandler
)
