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
    addEventListener: (DOMNode, String, EventHandler) => void,
    removeEventListener: (DOMNode, String, EventHandler) => void,
    addGlobalEventListener: (String, EventHandler) => void,
    removeGlobalEventListener: (String, EventHandler) => void
}

dom-delegator := (opts?: {
    defaultEvents?: Boolean,
    document?: Document
}) => Delegator

dom-delegator/dom-delegator := (doc?: Document) => Delegator

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
) => void
