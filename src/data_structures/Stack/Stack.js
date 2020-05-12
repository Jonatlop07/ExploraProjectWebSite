import Node from "Node.js";

class Stack {
    constructor() {
        this.__top = null;
    }

    push(object) {
        current = new Node(object);

        if (this.isEmpty()) {
            this.top = current;
        } else {
            current.next = this.top;
            this.top = current;
        }
    }

    query() {
        if (this.isEmpty() {
            return null;
        } else {
            return this.top.object;
        }
    }

    pop() {
        if (this.isEmpty()){
            return null;
        } else {
            objectToRemove = this.top.object;
            this.top = this.top.next;

            return objectToRemove;
        }
    }

    isEmpty() {
        return this.top == null;
    }

    get top () {
        return this.top;
    }

    set top(newNode) {
        this.top = newNode;
    }
}