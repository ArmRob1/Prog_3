var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var stoneArr = [];
var hunterArr = [];

var Grass = require("./Modules/Grass");
var GrassEater = require("./Modules/GrassEater");
var Hunter = require("./Modules/Hunter");
var Snake = require("./Modules/Snake");
var Stone = require("./Modules/Stone");



var side = 14;
var lengthY = 60;
var lengthX = 60;

var matrix = [];
for (let y = 0; y < lengthY; y++) {
    matrix[y] = [];
    for (let x = 0; x < lengthX; x++)
    {
        let a = Math.floor(Math.random() * 100);
        if (a >= 0 && a < 30)
            matrix[y][x] = 0;
        else if (a >= 30 && a < 75)
            matrix[y][x] = 1;
        else if (a >= 75 && a < 91)
            matrix[y][x] = 2;
        else if (a >= 91 && a < 100)
            matrix[y][x] = 3;
    }
}

var snake = new Snake(lengthY/2,lengthX/2);

var hunter = new Hunter(10,10);
hunterArr[0] = hunter;

function setup() {
     matrix[lengthY/2][lengthX/2] = 5;
     matrix[10][10] = 6;

    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var et = new GrassEater(x,y,2);
                grassEaterArr.push(et);
            }
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x,y,3);
                predatorArr.push(pr);
            }
        }
    }

}

var corners = [
    [0,0],
    [matrix.length-1,0],
    [0,matrix.length-1],
    [matrix.length-1,matrix.length-1]
];
var quant = 0;

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
        }
    }

    if(snake != null)
    snake.act();
    for (var i in grassArr) {
        grassArr[i].Action();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].move();
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
        grassEaterArr[i].die();
    }
    for (var i in predatorArr) {
        predatorArr[i].move();
        predatorArr[i].mul();
        predatorArr[i].die();
    }
    for (var i in stoneArr) {
        stoneArr[i].act();
    }
    for (var i in hunterArr) {
        hunterArr[i].act();
    }
}
