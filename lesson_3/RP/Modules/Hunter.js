module.exports = class Hunter extends LivingCreature{
    constructor(x,y)
    {
        super(x,y,6);
        this.index = 6;
        this.energy = 11;
        this.count = 0;
        this.quantityP = 0;
        this.quantityGE = 0;
        this.quantityG = 0;
    }
    getNewCoordinatesX1() {
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
    getNewCoordinatesX2() {
        this.directions = [];
        var counterX = -2;
        var counterY = -2;
        for (let i = 0; i < 25; i++) {
            this.directions[i] = [];
            this.directions[i][0] = this.x+counterX;
            this.directions[i][1] = this.y+counterY;

            counterX++;

            if (counterX == 3) {
                counterX = -2;
                counterY++;
            }
        }
        this.directions.splice(12,1);
    }
    getNewCoordinatesX3() {
        this.directions = [];
        var counterX = -3;
        var counterY = -3;
        for (let i = 0; i < 49; i++) {
            this.directions[i] = [];
            this.directions[i][0] = this.x+counterX;
            this.directions[i][1] = this.y+counterY;

            counterX++;

            if (counterX == 4) {
                counterX = -3;
                counterY++;
            }
        }

        this.directions.splice(24,1);
        return this.directions;
    }
    chooseCell(character,direction)
    {
        var found = [];
        for (var i in direction) {
            var x = direction[i][0];
            var y = direction[i][1];
            if (matrix[y] == undefined || matrix[y][x] == undefined)
                continue;

            if (matrix[y][x] == character)
                found.push(direction[i]);
        }
        return found;
    }
    act()
    {
        if (this.count > 11)
        {
            this.die();
            return;
        }

        if(this.energy>26)
        {
            this.mul();
        }

        if (this.energy>25)
            this.getNewCoordinatesX3();
        else if(this.energy>15)
            this.getNewCoordinatesX2();
        else
            this.getNewCoordinatesX1();


        //#region Snake
                var snakeCell = random(this.chooseCell(5,this.directions));
                if (snakeCell) {
                    this.energy+=20;
                    this.eat(snakeCell);
                    snake = null;

                    return;
                }
        //#endregion

        //#region Stone
                var stoneCell = random(this.chooseCell(4,this.directions));
                if (stoneCell) {
                    this.energy+=5;
                    this.eat(stoneCell);
                    this.destroy(stoneCell,stoneArr);

                    return;
                }
        //#endregion

        //#region Predator
                var predCell = random(this.chooseCell(3,this.directions));
                if (predCell) {
                    this.quantityGE = 0;
                    this.quantityG = 0;
                    this.quantityP++;
                    if (this.quantityP < 5)
                        this.energy+=4;

                    if (this.quantityP>7){
                        this.die();
                        return;
                    }

                    this.eat(predCell);
                    this.destroy(predCell,predatorArr);

                    return;
                }
        //#endregion

        //#region GrassEater
                var getCell = random(this.chooseCell(2,this.directions));
                if (getCell) {
                    this.quantityG = 0;
                    this.quantityP = 0;
                    this.quantityGE++;
                    if (this.quantityGE < 6)
                        this.energy+=3;

                    if (this.quantityGE > 8){
                        this.die();
                        return;
                    }

                    this.eat(getCell);
                    this.destroy(getCell,grassEaterArr);

                    return;
                }
        //#endregion

        //#region Grass
                var grassCell = random(this.chooseCell(1,this.directions));
                if (grassCell) {
                    this.quantityGE = 0;
                    this.quantityP = 0;
                    this.quantityG++;
                    if (this.quantityG < 12)
                        this.energy+=2;

                    if (this.quantityG > 25){
                        this.die();
                        return;
                    }

                    this.eat(grassCell);
                    this.destroy(grassCell,grassArr);

                    return;
                }
        //#endregion

        //#region empty
        var emptyCell = random(this.chooseCell(0,this.directions));
        if (emptyCell) {
            this.count++;
            var X = emptyCell[0];
            var Y = emptyCell[1];

            matrix[Y][X] = 6;
            matrix[this.y][this.x] = 0;

            this.x = X;
            this.y = Y;

            if (this.energy > 0)
                this.energy--;

            return;
        }
//#endregion
    }
    eat(cell)
    {
        this.count = 0;

        var X = cell[0];
        var Y = cell[1];

        matrix[Y][X] = 6;
        matrix[this.y][this.x] = 0;

        this.x = X;
        this.y = Y;
    }
    destroy(cell,arr)
    {
        var x = cell[0];
        var y = cell[1];

        for (var i in arr) {
            if (x == arr[i].x && y == arr[i].y) {
                arr.splice(i, 1);
                break;
            }
        }
    }
    mul()
    {
        this.getNewCoordinatesX3();
        var empty = random(this.chooseCell(0,this.directions));
        if (empty) {
            var newHunter = new Hunter(empty[0],empty[1]);
            hunterArr.push(newHunter);
            matrix[empty[1]][empty[0]] = 6;
            this.energy = 4;
        }
    }
    die()
    {
        for (var i in hunterArr) {
            if (this.x == hunterArr[i].x && this.y == hunterArr[i].y) {
                hunterArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;

            }
        }
    }
}
