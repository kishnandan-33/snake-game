export class Snake {

    constructor() {

        this.body = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 }
        ];

    }

    // Get the head of the snake
    getHead() {
        return this.body[0];
    }

    // Move snake by adding new head
    move(newHead) {
        return this.body.unshift(newHead);
    }

    // Remove tail
    removeTail() {
        return this.body.pop();
    }

    // Grow snake without removing tail
    grow(newHead) {
        this.body.unshift(newHead);
    }

    // Get complete snake body
    getBody() {
        return this.body;
    }

}