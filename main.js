const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(fieldArr = [
        []
    ]) {
        this.fieldArr = fieldArr;
        this.positionX = 0;
        this.positionY = 0;

        this.fieldArr[0][0] = pathCharacter;
    }

    print() {
        let field = [];
        let data = this.fieldArr;

        for (let arr of data) {
            let row = arr.join("");
            field.push(row);
        }

        console.log(field.join("\n"));
    }

    isHat() {
        return this.fieldArr[this.positionY][this.positionX] === hat;
    }

    isHole() {
        return this.fieldArr[this.positionY][this.positionX] === hole;
    }

    isInField() {
        return (this.positionX >= 0 && this.positionY >= 0 && this.positionX < this.fieldArr[0].length && this.positionY < this.fieldArr.length)
    }

    userInput() {
        const direction = prompt("Which direction? ").toLowerCase();
        switch (direction) {
            case "u":
                this.positionY -= 1;
                break;
            case "d":
                this.positionY += 1;
                break;
            case "l":
                this.positionX -= 1;
                break;
            case "r":
                this.positionX += 1;
                break;
            default:
                console.log("Enter u, d, l or r to move your character.");
                this.userInput();
                break;
        }
    }

    runGame() {
        let isPlaying = true;
        while (isPlaying) {
            this.print();
            this.userInput();

            if (this.isHat()) {
                console.log("Congratulations! You found your hat!");
                isPlaying = false;
                break;
            } else if (this.isHole()) {
                console.log("Oh no! You fell into a hole!");
                isPlaying = false;
                break;
            } else if (!this.isInField()) {
                console.log("You left the field! Don't you wanna find your hat?");
                isPlaying = false;
                break;
            } else {
                this.fieldArr[this.positionY][this.positionX] = pathCharacter;
            }
        }
    }

    static generateField(rows, cols, percentage = 0.25) {
        const field = new Array(rows).fill(0).map(row => new Array(cols));
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let probability = Math.random();
                if (probability < percentage) {
                    field[row][col] = hole;
                } else {
                    field[row][col] = fieldCharacter;
                }
            }
        }

        const hatPosition = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows)
        };
        while (hatPosition.x === 0 && hatPosition.y === 0) {
            hatPosition.x = Math.floor(Math.random() * cols);
            hatPosition.y = Math.floor(Math.random() * rows);
        }
        field[hatPosition.y][hatPosition.x] = hat;

        return field;
    }
}

const defaultField = new Field(Field.generateField(8, 8));
defaultField.runGame();