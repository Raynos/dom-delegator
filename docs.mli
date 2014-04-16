type DOMNode := DOMNode

type Delegator := {
    target: DOMNode,
    listenTo: (eventName: String) => void,
    addEventListener: (DOMNode, String, EventHandler)
}

type EventHandler := Function | {
    handleEvent: Function
}

type Listener := {
    currentTarget: DOMNode,
    handlers: [Function | EventHandler]
}

dom-delegator := (opts?: {
    defaultEvents?: Boolean
}) => Delegator

dom-delegator/add-event := (
    target: DOMNode,
    type: String,
    fn: EventHandler
) => void

dom-delegator/get-listener := (DOMNode, type: String ) 
    => null | Listener

dom-delegator/listen := (Delegator, eventName: String) => void
