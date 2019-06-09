module.exports = class Stone extends LivingCreature{
    constructor(x,y,index)
    {
        super(x,y,index);
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
    chooseCell(char1,char2,char3)
    {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (matrix[y] == undefined || matrix[y][x] == undefined)
                continue;

            if (matrix[y][x] != char1 && matrix[y][x] != char2 && matrix[y][x] != char3)
                found.push(this.directions[i]);

        }
        return found;
    }
    act()
    {
        this.energy++;
        if (this.energy < 22) {
            return;
        }
        var activeCell = random(this.chooseCell(4,5,6));
        var index;

        if (activeCell != undefined)
        {
            var newX = activeCell[0];
            var newY = activeCell[1];
            var index =  matrix[newY][newX];

            this.mul(newX,newY);

            if (index == 1) {
                this.destroy(newX,newY,grassArr);
            }
            else if (index == 2) {
                this.destroy(newX,newY,grassEaterArr);
            }
            else if (index == 3) {
                this.destroy(newX,newY,predatorArr);
            }

        }
    }
    mul(x,y)
    {
        var stone = new Stone(x,y,4);
        stoneArr.push(stone);
        matrix[y][x] = 4;
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
}
