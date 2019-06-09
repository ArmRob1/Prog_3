module.exports = class Snake extends LivingCreature{
    constructor(x,y)
    {
        super(x,y,5);
        this.index = 5;
        this.energy = 1;
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
    chooseCorrectCell(character)
    {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (matrix[y] == undefined || matrix[y][x] == undefined)
                continue;

            if (matrix[y][x] != character)
                found.push(this.directions[i]);
        }
        return found;
    }
    chooseCell(character)
    {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (matrix[y] == undefined || matrix[y][x] == undefined)
                continue;

            if (matrix[y][x] == character)
                found.push(this.directions[i]);
        }
        return found;
    }
    act()
    {
        if (this.energy > 0) {
            this.energy--;
        }

        var activeCell = random(this.chooseCorrectCell(4));
        var index;

        if (activeCell != undefined)
        {
            var newX = activeCell[0];
            var newY = activeCell[1];
            var index =  matrix[newY][newX];
            matrix[newY][newX] = 5;

            if (index == 6) {
                this.destroy(newX,newY,hunterArr);
                this.energy+=10;
            }

            if (index == 1) {
                this.destroy(newX,newY,grassArr);
                this.energy+=2;
            }
            else if (index == 2) {
                this.destroy(newX,newY,grassEaterArr);
                this.energy+=3;
            }
            else if (index == 3) {
                this.destroy(newX,newY,predatorArr);
                this.energy+=4;
            }

            if (this.energy > 0)
            this.createStone(this.x,this.y);
            else
                matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;


            return;
        }

        activeCell = random(this.chooseCell(4));
        if (activeCell != undefined)
        {
            var newX = activeCell[0];
            var newY = activeCell[1];
            matrix[newY][newX] = 5;
            this.destroy(newX,newY,stoneArr);
            if (this.energy > 0)
            this.createStone(this.x,this.y);
            else
                matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;


        }
    }
    destroy(x,y,arr)
    {
        for (var i in arr) {
            if (x == arr[i].x && y == arr[i].y) {
                arr.splice(i, 1);
                break;
            }
        }
    }
    createStone(x,y)
    {
        var stone = new Stone(x,y,4);
            stoneArr.push(stone);
            matrix[y][x] = 4;
    }
}
