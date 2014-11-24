type ProxyEvent := DOMEvent & {
    _rawEvent: DOMEvent,
    currentTarget: DOMNode,
    preventDefault: () => void,
    startPropagation: () => void
}

type Handle<T> : {
    type: "dom-delegator-handle"
}

type EventHandler := Function<ProxyEvent> | {
    handleEvent: Function<ProxyEvent>
} | Handle<ProxyEvent>

type Delegator := {
    target: DOMNode,
    listenTo: (eventName: String) => void,
    unlistenTo: (eventName: String) => void,

    addEventListener: (DOMNode, String, EventHandler) => void,
    removeEventListener: (DOMNode, String, EventHandler) => void,
    addGlobalEventListener: (String, EventHandler) => void,
    removeGlobalEventListener: (String, EventHandler) => void

    allocateHandle : (fn: (T) => void) => Handle<T>,
    transformHandle : (
        handle: Handle<S <: Object>,
        lambda: (T, broadcast: (S) => void) => void
    ) => Handle<T>
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
