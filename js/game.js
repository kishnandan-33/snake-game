import { Snake } from './snake.js';
import { createFood } from './food.js';
import { wallCollision, bodyCollision, foodCollision } from "./collision.js";

export class Game {

    constructor() {

        this.rows = 20;

        this.columns = 20;

        //create snake 
        this.snake = new Snake();

        //craete food
        this.food = createFood(
            this.snake.getBody(), // Avoid placing food on the snake's body
            this.rows,
            this.columns
        );
        // Set the initial speed in milliseconds, direction to "RIGHT"
        //because the snake starts moving to the right, and nextDirection to "RIGHT"
        // because the snake starts moving to the right
        this.speed = 150;
        this.direction = "RIGHT";
        this.nextDirection = "RIGHT";
        
        this.running = true;

    }
    //set direction
    setDirection(direction) {

        const opposite = { // Define opposite directions

            UP: "DOWN",
            DOWN: "UP",
            LEFT: "RIGHT",
            RIGHT: "LEFT"

        };

        if (opposite[this.direction] === direction) {
            return;
        }

        this.nextDirection = direction;

    }
    //update the game state
    update() {

        if (this.running === false) return;

        this.direction = this.nextDirection;

        const movement = {

            UP: { x: 0, y: -1 },
            DOWN: { x: 0, y: 1 },
            LEFT: { x: -1, y: 0 },
            RIGHT: { x: 1, y: 0 }
        };

        const head = this.snake.getHead();

        const newHead = {
            x:
                head.x +
                movement[this.direction].x,

            y:
                head.y +
                movement[this.direction].y

        };

        // Wall collision
        if (wallCollision(newHead, this.rows, this.columns)) {

            this.endGame();
            return;

        }

        // Body collision
        if (bodyCollision(newHead, this.snake.getBody())) {

            this.endGame();
            return;

        }

        // Move snake
        this.snake.move(newHead);

        // Food
        if (foodCollision(newHead, this.food)) {
            this.food = createFood(
                this.snake.getBody(),
                this.rows,
                this.columns
            );
        }
        else {
            this.snake.removeTail();

        }

    }

    // end game
    endGame() {

        this.running = false;

    }

}
