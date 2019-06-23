var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Grass extends LiveForm {
    constructor(x, y,isboy) {
        super(x, y);
        this.multiply = 2;
        if (isboy == 0) {
            this.gend = "boy";
        }
        else{
            this.gend = "girl";
        }
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
    mul() {
        if (weather == "winter") {
            return;
        }

        if (weather == "spring") {
            this.multiply+=1.5;
        }
        else{
            this.multiply++;
        }

        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        let bord;
        if (this.gend == "boy") {
            bord = 3;
        }
        else{
            bord = 3.5;
        }


        if (newCell && this.multiply >= bord) {
            grassHashiv++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 1;
            let grass = new Grass(x, y);
            grassArr.push(grass);
            this.multiply = 0.5;
        }
    }
}