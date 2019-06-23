var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Predator extends LiveForm{
    constructor(x, y, index) {
        super(x, y);
        this.index = index;
        this.energy = 13;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {
        this.energy--;
        var newGrassEater  = random(this.chooseCell(2));
        var newGrass  = random(this.chooseCell(1));
        if (newGrassEater) {
            this.eat(newGrassEater,grassEaterArr);

            if (weather == "spring") {
                this.energy += 3;
            }
            else{
                this.energy += 2.5;
            }
        }
        else if(newGrass){
            this.eat(newGrass,grassArr);
            this.energy += 0.9;
        }
        else
        {
            var newCell = random(this.chooseCell(0));

            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];

                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;

                this.y = newY;
                this.x = newX;

            } 
        }
    }
    eat(newCell,arr) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in arr) {
                if (newX == arr[i].x && newY == arr[i].y) {
                    arr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;

    }
    mul() {
        var newCell = random(this.chooseCell(0));

        if (this.energy >= 15 && newCell) {
            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            predatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 11;
        }
    }
    die()
    {
        if (this.energy <= 0)
        {
            matrix[this.y][this.x] = 0;
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }                
            }
        }
    }
}