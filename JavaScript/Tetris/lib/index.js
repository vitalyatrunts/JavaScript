const mapWidth = 300;
const mapHeight = 600;
const numberOfRows = 20;
const numberOfCols = 10;
const cellSize = mapWidth/numberOfCols;
const borderSize = 0.2;

const zType = [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
]

const sType = [
    [2, 2, 0],
    [2, 2, 0],
    [0, 0, 0]
]

const iType = [
    [0, 3, 0 ,0],
    [0, 3, 0 ,0],
    [0, 3, 0 ,0],
    [0, 3, 0 ,0]
]

const lType = [
    [4, 0, 0],
    [4, 0, 0],
    [4, 4, 0]
]

const jType = [
    [0, 0, 5],
    [0, 0, 5],
    [0, 5, 5]
]

const oType = [
    [6, 6],
    [6, 6]
]

const tType = [
    [0, 7, 0],
    [7, 7, 7],
    [0, 0, 0]
]

const blockColors = [
    'limegreen',
    'darkorange',
    'mediumorchid',
    'dodgerblue',
    'orangered',
    'cornflowerblue',
    'tomato'
]

const blockTypes = {
    zType,
    sType,
    iType,
    lType,
    jType,
    oType,
    tType
}


class Block {
    constructor(cells, x, y) {
        this.cells = cells;
        this.position = {x, y};
        this.isAlive = true;   
    }

    rotate() {
        const newCells = [];
        for(let i = 0; i< this.cells.length; i++) {
            newCells[i] = [];
            for(let j = 0; j < this.cells.length; j++) {
                newCells[i][j] = this.cells[this.cells.length - 1 - j][i];
            }

        }
        this.cells = newCells;
    }

    moveBlockByEvent(e){
        switch(e.key) {
            case "ArrowLeft" : {
                this.position.x--;
                break;
            }
            case "ArrowRight" : {
                this.position.x++;
                break;
            }
            case "ArrowDown" : {
                if(this.cells.length + this.position.y < numberOfRows){
                    this.position.y++
                }
                break;
            }
            case "ArrowUp" : {
                this.rotate()
                break;
            }
        }
    }

    findCollision(field) {
        
        const {x, y} = this.position;
        this.cells.forEach((rows, i ) => {
            rows.forEach((cell, j) => {
                if(cell && ((y + i >= numberOfRows) || field[y + i][x + j])){
                    this.isAlive = false;
                    return
                }
            })
        })
    }
}

const updateScore = (score) => {
    const scoreElem = document.getElementById('score');
    scoreElem.innerHTML = score;
}

const checkCanMove = (block,field) => {
    const {cells, position} = block;
    const { x , y} = position;
    return !cells.some((rows, i) => {
        return rows.some((cell,j) => {
            if(
                (cell && x + j < 0) || 
                (cell && x + j >= numberOfCols) ||
                (cell && field[y + i][x + j])
            )
            return true
        })
    })
}

const drawField = (field, ctx) => {
    field.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            ctx.fillStyle = cell ? blockColors[cell - 1]: 'lightblue'
            ctx.strokeStyle = '#555';
            ctx.lineWidth = borderSize;

            const args = [
                colIndex * cellSize, rowIndex * cellSize,
                cellSize, cellSize
            ]

            ctx.fillRect(...args);
            ctx.strokeRect(...args);
        })
    })
}

const {requestAnimationFrame} = window;
const fps = 24;
const timeToMoveDown = 500;

let prevTime = 0;
let counterOfF = 0;
let prevPosition = {x: 0, y:0}
let prevBlockCells = [[]]

const render = (game, block, time) => {
    if(!block) {
        const arrOfTypes = Object.values(blockTypes);
        const blockType = arrOfTypes[arrOfTypes.length * Math.random() | 0];
        const x = ((numberOfCols - blockType.length) / 2) | 0;
        block = new Block(blockType, x, 0);
        prevPosition = {x, y:0}
        addEventListener('keydown', (e) => block.moveBlockByEvent(e).bind(block))
    }

    const {ctx, field} = game;
    const {position} = block;
   
    if(time - prevTime > 1000 / 65){
        counterOfF ++;
       
        if(counterOfF === (60 * timeToMoveDown) / 1000){
            counterOfF = 0;
            if( block && block.isAlive) {
                position.y++;
            } else {
                block = null;
            }
        }
    }

    prevTime = time;

    insertIntoArray(prevBlockCells, field, prevPosition.y, prevPosition.x, true)

    const canMove = checkCanMove(block, field)
    if(!canMove) {
        position.x = prevPosition.x;
        block.cells = prevBlockCells;
    }
    
    
    block.findCollision(field)
    
        
   if(block.isAlive) { 
      insertIntoArray(block.cells, field, position.y, position.x);
      drawField(field, ctx);
      prevPosition = Object.assign({},position);
      prevBlockCells = [].concat(block.cells);
    } else if(prevPosition.y > block.cells.length-1) {
        insertIntoArray(block.cells, field, prevPosition.y, prevPosition.x)
        game.field = findFilledRow(field);
        drawField(game.field, ctx);
        block = null;
    }
    
    requestAnimationFrame((time) => 
        {
        render(game, block, time)
        }
    );
}

const insertIntoArray = (childArr, parentArr, row, col, clearMode) => {
    let i = 0;
    
    while(i < childArr.length) {
        let j = 0;
        while(j < childArr[i].length) {
            parentArr[row + i][col + j] = !clearMode
                ? childArr[i][j]
                    ? childArr[i][j]
                    : parentArr[row + i][col + j]
                : childArr[i][j]
                    ? 0 
                    : parentArr[row + i][col + j];
            j++
        }
        i++
    }
}


let score = 0;
const findFilledRow = (field) => {
    const filteredField = field.filter((row) => row.some((cell) => (cell === 0)))
    const diff = field.length - filteredField.length;
    score += diff*100;
    updateScore(score);
    const filledArr = generateField(diff, numberOfCols);
    return [...filledArr, ...filteredField];
}
const generateField = (rows,cols) => {
    const field = Array.from({length: rows}, 
        () => Array.from({length: cols}, () => 0))
        return field;
}


window.onload = () => {
    const canvas = document.getElementById("map");
    const ctx = canvas.getContext("2d");
    const game = {
        ctx,
        field: generateField(numberOfRows + 4, numberOfCols)
    }

    render(game);
}