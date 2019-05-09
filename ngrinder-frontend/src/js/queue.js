export default class Queue {
    constructor(size) {
        this.size = Math.ceil(size);
        this.aElement = new Array(this.size);
        this.aElement = new Array(this.size);
        for (let i = 0; i < this.size; i++) {
            this.aElement[i] = 0;
        }
    }

    enQueue(vElement) {
        if (arguments.length === 0) {
            return;
        }

        for (let i = 0; i < arguments.length; i++) {
            this.deQueue();
            this.aElement.push(arguments[i]);
        }
    }

    deQueue() {
        if (this.aElement.length === 0) {
            return null;
        } else {
            return this.aElement.shift();
        }
    }

    getArray() {
        return this.aElement;
    }

    isEmpty() {
        return this.aElement.length === 0;
    }

    toString() {
        return `[${this.aElement.toString()}]`;
    }
}
