module.exports = class LivingCreature {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 0;
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
    chooseCell(character, isGrass) {
        if (!isGrass)
            this.getNewCoordinates();

        var found = [];
        for (var i in this.directions)
        {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (matrix[y] == undefined || matrix[y][x] == undefined)
                continue;

            if (matrix[y][x] == character)
                found.push(this.directions[i]);
        }

        return found;
    }


    mul(borderEng, newEng,isGrass,character,Myclass,arr) {
        if(this.energy>=borderEng)
        {
            var newCell = random(this.chooseCell(character,isGrass));

            if (newCell) {
                matrix[newCell[1]][newCell[0]] = this.index;
                this.energy = newEng;

                var newItem = new Myclass(newCell[0], newCell[1], this.index);
                arr.push(newItem);
                return true;
            }
        }
        return false;
    }

    die(arr)
    {
        if (this.energy <= 0)
        {
          console.log("die");
            console.log(matrix[this.y][this.x]);

            matrix[this.y][this.x] = 0;

            console.log(matrix[this.y][this.x]);

            for (var i in arr)
            {
                if (this.x == arr[i].x && this.y == arr[i].y)
                {
                    arr.splice(i, 1);
                    return true;
                }

            }
        }
        return false;
    }

    eat(character,arrSplice) {
        var newCell = random(this.chooseCell(character));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            console.log(newCell);

            this.destroy(newX,newY,arrSplice);

            this.y = newY;
            this.x = newX;
            // this.energy += 2;
            return newCell;
        }
        else{
            return undefined;
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

    move(){
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            this.y = newY;
            this.x = newX;

            return newCell;
        }

        return undefined;
    }
}


// class Grass extends LivingCreature{
//     constructor(x, y, index){
//         super(x,y,index);
//     }
//     Action(){
//         this.energy++;
//         super.mul(8,0,true,0,Grass,grassArr);
//     }
// }
//
// // class GrassEater extends Creature{
// //     constructor(x, y, index){
// //         super(x,y,index);
// //         this.energy = 4;
// //     }
// //     Action(){
// //         this.energy--;
// //         var isDead = super.die(grassEaterArr);
// //         if(isDead){
// //             console.log("mera");
// //             return;
// //         }
// //
// //         var isMul = super.mul(8,4,false,0,GrassEater,grassEaterArr);
// //         if(isMul){
// //             return;
// //         }
// //
// //         var newCell = super.eat(1,grassArr);
// //         if(newCell)
// //         {
// //             console.log(newCell);
// //             this.y = newCell[0];
// //             this.x = newCell[1];
// //             this.energy += 2;
// //         }
// //         else
// //         {
// //             var newCell2 = super.move();
// //             if(newCell2){
// //                 this.y = newCell2[0];
// //                 this.x = newCell2[1];
// //             }
// //         }
// //
// //     }
// // }
//
// class GrassEater extends LivingCreature {
//     constructor(x, y, index) {
//         super(x,y,index);
//         this.energy = 4;
//     }
//     getNewCoordinates() {
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1]
//         ];
//     }
//     chooseCell(character) {
//         this.getNewCoordinates();
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (matrix[y] != undefined ) {
//                 if (matrix[y][x] != undefined) {
//                 if (matrix[y][x] == character) {
//                         found.push(this.directions[i]);
//                     }
//                 }
//             }
//         }
//         return found;
//     }
//     move() {
//         var newCell = random(this.chooseCell(0));
//
//         if (newCell) {
//             var newX = newCell[0];
//             var newY = newCell[1];
//
//             matrix[this.y][this.x] = 0;
//             matrix[newY][newX] = this.index;
//
//             this.y = newY;
//             this.x = newX;
//             this.energy--;
//         }
//     }
//     eat() {
//         var newCell = random(this.chooseCell(1));
//
//         if (newCell) {
//             var newX = newCell[0];
//             var newY = newCell[1];
//
//             matrix[this.y][this.x] = 0;
//             matrix[newY][newX] = this.index;
//
//             for (var i in grassArr) {
//                 if (newX == grassArr[i].x && newY == grassArr[i].y) {
//                     grassArr.splice(i, 1);
//                     break;
//                 }
//             }
//
//             this.y = newY;
//             this.x = newX;
//             this.energy += 2;
//         }
//     }
//     mul() {
//         var newCell = random(this.chooseCell(0));
//
//         if (this.energy >= 8 && newCell) {
//             var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
//             grassEaterArr.push(newGrassEater);
//             matrix[newCell[1]][newCell[0]] = 2;
//             this.energy = 4;
//         }
//     }
//     die()
//     {
//         if (this.energy == 0)
//         {
//             matrix[this.y][this.x] = 0;
//             for (var i in grassEaterArr) {
//                 if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
//                     grassEaterArr.splice(i, 1);
//                     break;
//                 }
//             }
//         }
//     }
// }
//
// class Predator extends LivingCreature {
//     constructor(x, y, index) {
//         super(x,y,index);
//         this.energy = 4;
//     }
//     getNewCoordinates() {
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1]
//         ];
//     }
//     chooseCell(character) {
//         this.getNewCoordinates();
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (matrix[y] != undefined ) {
//                 if (matrix[y][x] != undefined) {
//                 if (matrix[y][x] == character) {
//                         found.push(this.directions[i]);
//                     }
//                 }
//             }
//         }
//         return found;
//     }
//     move() {
//         this.energy--;
//         var newGrassEater  = random(this.chooseCell(2));
//         if (newGrassEater) {
//             this.eat(newGrassEater);
//         }
//         else
//         {
//             var newCell = random(this.chooseCell(0));
//
//             if (newCell) {
//                 var newX = newCell[0];
//                 var newY = newCell[1];
//
//                 matrix[this.y][this.x] = 0;
//                 matrix[newY][newX] = this.index;
//
//                 this.y = newY;
//                 this.x = newX;
//
//             }
//         }
//     }
//     eat(newCell) {
//             var newX = newCell[0];
//             var newY = newCell[1];
//
//             matrix[this.y][this.x] = 0;
//             matrix[newY][newX] = this.index;
//
//             for (var i in grassEaterArr) {
//                 if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
//                     grassEaterArr.splice(i, 1);
//                     break;
//                 }
//             }
//
//             this.y = newY;
//             this.x = newX;
//             this.energy += 2;
//     }
//     mul() {
//         var newCell = random(this.chooseCell(0));
//
//         if (this.energy >= 12 && newCell) {
//             var newPredator = new Predator(newCell[0], newCell[1], this.index);
//             predatorArr.push(newPredator);
//             matrix[newCell[1]][newCell[0]] = 2;
//             this.energy = 4;
//         }
//     }
//     die()
//     {
//         if (this.energy == 0)
//         {
//             matrix[this.y][this.x] = 0;
//             for (var i in predatorArr) {
//                 if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
//                     predatorArr.splice(i, 1);
//                     break;
//                 }
//             }
//         }
//     }
// }
//
// class Snake extends LivingCreature{
//     constructor(x,y)
//     {
//         super(x,y,5);
//         this.index = 5;
//         this.energy = 1;
//     }
//     getNewCoordinates() {
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1]
//         ];
//     }
//     chooseCorrectCell(character)
//     {
//         this.getNewCoordinates();
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (matrix[y] == undefined || matrix[y][x] == undefined)
//                 continue;
//
//             if (matrix[y][x] != character)
//                 found.push(this.directions[i]);
//         }
//         return found;
//     }
//     chooseCell(character)
//     {
//         this.getNewCoordinates();
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (matrix[y] == undefined || matrix[y][x] == undefined)
//                 continue;
//
//             if (matrix[y][x] == character)
//                 found.push(this.directions[i]);
//         }
//         return found;
//     }
//     act()
//     {
//         if (this.energy > 0) {
//             this.energy--;
//         }
//
//         var activeCell = random(this.chooseCorrectCell(4));
//         var index;
//
//         if (activeCell != undefined)
//         {
//             var newX = activeCell[0];
//             var newY = activeCell[1];
//             var index =  matrix[newY][newX];
//             matrix[newY][newX] = 5;
//
//             if (index == 6) {
//                 this.destroy(newX,newY,hunterArr);
//                 this.energy+=10;
//             }
//
//             if (index == 1) {
//                 this.destroy(newX,newY,grassArr);
//                 this.energy+=2;
//             }
//             else if (index == 2) {
//                 this.destroy(newX,newY,grassEaterArr);
//                 this.energy+=3;
//             }
//             else if (index == 3) {
//                 this.destroy(newX,newY,predatorArr);
//                 this.energy+=4;
//             }
//
//             if (this.energy > 0)
//             this.createStone(this.x,this.y);
//             else
//                 matrix[this.y][this.x] = 0;
//
//             this.x = newX;
//             this.y = newY;
//
//
//             return;
//         }
//
//         activeCell = random(this.chooseCell(4));
//         if (activeCell != undefined)
//         {
//             var newX = activeCell[0];
//             var newY = activeCell[1];
//             matrix[newY][newX] = 5;
//             this.destroy(newX,newY,stoneArr);
//             if (this.energy > 0)
//             this.createStone(this.x,this.y);
//             else
//                 matrix[this.y][this.x] = 0;
//
//             this.x = newX;
//             this.y = newY;
//
//
//         }
//     }
//     destroy(x,y,arr)
//     {
//         for (var i in arr) {
//             if (x == arr[i].x && y == arr[i].y) {
//                 arr.splice(i, 1);
//                 break;
//             }
//         }
//     }
//     createStone(x,y)
//     {
//         var stone = new Stone(x,y,4);
//             stoneArr.push(stone);
//             matrix[y][x] = 4;
//     }
// }
//
// class Stone extends LivingCreature
// {
//     constructor(x,y,index)
//     {
//         super(x,y,index);
//         this.energy = 0;
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1]
//         ];
//     }
//     chooseCell(char1,char2,char3)
//     {
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (matrix[y] == undefined || matrix[y][x] == undefined)
//                 continue;
//
//             if (matrix[y][x] != char1 && matrix[y][x] != char2 && matrix[y][x] != char3)
//                 found.push(this.directions[i]);
//
//         }
//         return found;
//     }
//     act()
//     {
//         this.energy++;
//         if (this.energy < 22) {
//             return;
//         }
//         var activeCell = random(this.chooseCell(4,5,6));
//         var index;
//
//         if (activeCell != undefined)
//         {
//             var newX = activeCell[0];
//             var newY = activeCell[1];
//             var index =  matrix[newY][newX];
//
//             this.mul(newX,newY);
//
//             if (index == 1) {
//                 this.destroy(newX,newY,grassArr);
//             }
//             else if (index == 2) {
//                 this.destroy(newX,newY,grassEaterArr);
//             }
//             else if (index == 3) {
//                 this.destroy(newX,newY,predatorArr);
//             }
//
//         }
//     }
//     mul(x,y)
//     {
//         var stone = new Stone(x,y,4);
//         stoneArr.push(stone);
//         matrix[y][x] = 4;
//     }
//     destroy(x,y,arr)
//     {
//         for (var i in arr) {
//             if (x == arr[i].x && y == arr[i].y) {
//                 arr.splice(i, 1);
//                 break;
//             }
//         }
//     }
// }
//
// class Hunter extends LivingCreature
// {
//     constructor(x,y)
//     {
//         super(x,y,6);
//         this.index = 6;
//         this.energy = 11;
//         this.count = 0;
//         this.quantityP = 0;
//         this.quantityGE = 0;
//         this.quantityG = 0;
//     }
//     getNewCoordinatesX1() {
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1]
//         ];
//     }
//     getNewCoordinatesX2() {
//         this.directions = [];
//         var counterX = -2;
//         var counterY = -2;
//         for (let i = 0; i < 25; i++) {
//             this.directions[i] = [];
//             this.directions[i][0] = this.x+counterX;
//             this.directions[i][1] = this.y+counterY;
//
//             counterX++;
//
//             if (counterX == 3) {
//                 counterX = -2;
//                 counterY++;
//             }
//         }
//         this.directions.splice(12,1);
//     }
//     getNewCoordinatesX3() {
//         this.directions = [];
//         var counterX = -3;
//         var counterY = -3;
//         for (let i = 0; i < 49; i++) {
//             this.directions[i] = [];
//             this.directions[i][0] = this.x+counterX;
//             this.directions[i][1] = this.y+counterY;
//
//             counterX++;
//
//             if (counterX == 4) {
//                 counterX = -3;
//                 counterY++;
//             }
//         }
//
//         this.directions.splice(24,1);
//         return this.directions;
//     }
//     chooseCell(character,direction)
//     {
//         var found = [];
//         for (var i in direction) {
//             var x = direction[i][0];
//             var y = direction[i][1];
//             if (matrix[y] == undefined || matrix[y][x] == undefined)
//                 continue;
//
//             if (matrix[y][x] == character)
//                 found.push(direction[i]);
//         }
//         return found;
//     }
//     act()
//     {
//         if (this.count > 11)
//         {
//             this.die();
//             return;
//         }
//
//         if(this.energy>26)
//         {
//             this.mul();
//         }
//
//         if (this.energy>25)
//             this.getNewCoordinatesX3();
//         else if(this.energy>15)
//             this.getNewCoordinatesX2();
//         else
//             this.getNewCoordinatesX1();
//
//
//         //#region Snake
//                 var snakeCell = random(this.chooseCell(5,this.directions));
//                 if (snakeCell) {
//                     this.energy+=20;
//                     this.eat(snakeCell);
//                     snake = null;
//
//                     return;
//                 }
//         //#endregion
//
//         //#region Stone
//                 var stoneCell = random(this.chooseCell(4,this.directions));
//                 if (stoneCell) {
//                     this.energy+=5;
//                     this.eat(stoneCell);
//                     this.destroy(stoneCell,stoneArr);
//
//                     return;
//                 }
//         //#endregion
//
//         //#region Predator
//                 var predCell = random(this.chooseCell(3,this.directions));
//                 if (predCell) {
//                     this.quantityGE = 0;
//                     this.quantityG = 0;
//                     this.quantityP++;
//                     if (this.quantityP < 5)
//                         this.energy+=4;
//
//                     if (this.quantityP>7){
//                         this.die();
//                         return;
//                     }
//
//                     this.eat(predCell);
//                     this.destroy(predCell,predatorArr);
//
//                     return;
//                 }
//         //#endregion
//
//         //#region GrassEater
//                 var getCell = random(this.chooseCell(2,this.directions));
//                 if (getCell) {
//                     this.quantityG = 0;
//                     this.quantityP = 0;
//                     this.quantityGE++;
//                     if (this.quantityGE < 6)
//                         this.energy+=3;
//
//                     if (this.quantityGE > 8){
//                         this.die();
//                         return;
//                     }
//
//                     this.eat(getCell);
//                     this.destroy(getCell,grassEaterArr);
//
//                     return;
//                 }
//         //#endregion
//
//         //#region Grass
//                 var grassCell = random(this.chooseCell(1,this.directions));
//                 if (grassCell) {
//                     this.quantityGE = 0;
//                     this.quantityP = 0;
//                     this.quantityG++;
//                     if (this.quantityG < 12)
//                         this.energy+=2;
//
//                     if (this.quantityG > 25){
//                         this.die();
//                         return;
//                     }
//
//                     this.eat(grassCell);
//                     this.destroy(grassCell,grassArr);
//
//                     return;
//                 }
//         //#endregion
//
//         //#region empty
//         var emptyCell = random(this.chooseCell(0,this.directions));
//         if (emptyCell) {
//             this.count++;
//             var X = emptyCell[0];
//             var Y = emptyCell[1];
//
//             matrix[Y][X] = 6;
//             matrix[this.y][this.x] = 0;
//
//             this.x = X;
//             this.y = Y;
//
//             if (this.energy > 0)
//                 this.energy--;
//
//             return;
//         }
// //#endregion
//     }
//     eat(cell)
//     {
//         this.count = 0;
//
//         var X = cell[0];
//         var Y = cell[1];
//
//         matrix[Y][X] = 6;
//         matrix[this.y][this.x] = 0;
//
//         this.x = X;
//         this.y = Y;
//     }
//     destroy(cell,arr)
//     {
//         var x = cell[0];
//         var y = cell[1];
//
//         for (var i in arr) {
//             if (x == arr[i].x && y == arr[i].y) {
//                 arr.splice(i, 1);
//                 break;
//             }
//         }
//     }
//     mul()
//     {
//         this.getNewCoordinatesX3();
//         var empty = random(this.chooseCell(0,this.directions));
//         if (empty) {
//             var newHunter = new Hunter(empty[0],empty[1]);
//             hunterArr.push(newHunter);
//             matrix[empty[1]][empty[0]] = 6;
//             this.energy = 4;
//         }
//     }
//     die()
//     {
//         for (var i in hunterArr) {
//             if (this.x == hunterArr[i].x && this.y == hunterArr[i].y) {
//                 hunterArr.splice(i, 1);
//                 matrix[this.y][this.x] = 0;
//                 break;
//
//             }
//         }
//     }
// }
