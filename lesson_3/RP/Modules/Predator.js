module.exports = class Predator extends LivingCreature {
    constructor(x, y, index) {
        super(x,y,index);
        this.energy = 4;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (matrix[y] != undefined ) {
                if (matrix[y][x] != undefined) {
                if (matrix[y][x] == character) {
                        found.push(this.directions[i]);
                    }
                }
            }
        }
        return found;
    }
    move() {
        this.energy--;
        var newGrassEater  = random(this.chooseCell(2));
        if (newGrassEater) {
            this.eat(newGrassEater);
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
    eat(newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 2;
    }
    mul() {
        var newCell = random(this.chooseCell(0));

        if (this.energy >= 12 && newCell) {
            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            predatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 4;
        }
    }
    die()
    {
        if (this.energy == 0)
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
