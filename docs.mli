type EventHandler := Function | {
    handleEvent: Function
}

type Delegator := {
    target: DOMNode,
    listenTo: (eventName: String) => void,
    unlistenTo: (eventName: String) => void,
    addEventListener: (DOMNode, String, EventHandler),
    removeEventListener: (DOMNode, String, EventHandler)
}

dom-delegator := (opts?: {
    defaultEvents?: Boolean
}) => Delegator

dom-delegator/add-event := (
    target: DOMNode,
    type: String,
    fn: EventHandler
) => void

dom-delegator/remove-event := (
    target: DOMNode,
    type: String,
    fn: EventHandler
)
