degToRad = (angle) => ((angle * Math.PI) / 180);

class Snake {
    constructor(x, y, angle, length, game){
        this.color = "#ff5050";
        this.name = name;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.length = length;
        this.ctx = game.ctx;
        this.game = game;
        this.coordinates = [];
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, Snake.HEAD_RADIUS, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    running(canvasSize, that) {
        const radian = degtoRad(this.angle);
        that.x += Snake.SPEED * Math.cos(radian);
        that.y += Snake.SPEED * Math.sin(radian);
        that.validationCoordinates(canvasSize);
        that.pushCoordinates();
        that.draw();
        that.findSnakeCollision();
    }

    validationCoordinates({mapW, mapH}) {
        if(
            (this.x < 0) || (this.x > mapW) ||
            (this.y < 0) || (this.y > mapH)
        )   {
                //finishGame();
            }
    }

    pushCoordinates() {
        this.coordinates.push(
            {
                x: this.x,
                y: this.y
            })
        this.snakeLengthControl();
    }

    snakeLengthControl() {
        if(this.coordinates.length > this.length) {
            const { x, y } = this.coordinates[0];
            this.ctx.beginPath();
            this.ctx.fillStyle = "#fff";
            this.ctx.arc(x, y, Snake.HEAD_RADIUS + 2, 0, 2 * Math.PI);
            this.ctx.fill();
            
            this.coordinates.shift();
        }
    }

    findSnakeCollision() {
        this.coordinates.slice(0, -Snake.HEAD_RADIUS).forEach(({ x, y }) => {
            const distance = Math.sqrt(((x - this.x) ** 2) + ((y - this.y) ** 2))
            if(distance < Snake.HEAD_RADIUS + 2) {
                // finishGame();
            }
        })
    }
}

Snake.HEAD_RADIUS = 5;
Snake.SPEED = 2;
Snake.INITIAL_LENGTH = 150;

const startGame = (game) => {
    const { snake, ctx } = game;
    const canvasSize = {mapW : 500, mapH : 500};

    game.snakeInterval = setInterval(snake.running, 30, canvasSize, snake);

}

window.onload = () => {
    const canvas = document.getElementById('map');
    const ctx = canvas.getContext();
    const game = { ctx };

    game.snake = new Snake(100, 100, 0, Snake.INITIAL_LENGTH, game);
    startGame(snake);
}

