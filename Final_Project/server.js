//Node
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//use html
app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('index.html');
});

//set localhost
server.listen(3000, function () {
   console.log("Program is running on port 3000 To access write 'http://localhost:3000/'");
});

//Classes
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
var Stone = require("./modules/Stone.js");
var Hunter = require("./modules/Hunter.js");

let random = require('./modules/random');

var fs = require('fs');

matrix = [];

//Arrays
grassArr = [];
grassEaterArr = [];
predatorArr = [];
stoneArr = [];
hunterArr = [];


//Global Variables
grassHashiv = 0;
stoneCount = 0;
weather = "summer";
isBoy = true;


function matrixGenerator(matrixSize, grass, grassEater, predator, hunter) {
   for (let i = 0; i < matrixSize; i++) {
      matrix[i] = [];
      for (let o = 0; o < matrixSize; o++) {
         matrix[i][o] = 0;
      }
   }
   for (let i = 0; i < grass; i++) {
      let customX = Math.floor(random(matrixSize));
      let customY = Math.floor(random(matrixSize));
      matrix[customY][customX] = 1;
   }
   for (let i = 0; i < grassEater; i++) {
      let customX = Math.floor(random(matrixSize));
      let customY = Math.floor(random(matrixSize));
      matrix[customY][customX] = 2;
   }
   for (let i = 0; i < predator; i++) {
      let customX = Math.floor(random(matrixSize));
      let customY = Math.floor(random(matrixSize));
      matrix[customY][customX] = 3;
   }
   for (let i = 0; i < hunter; i++) {
      let customX = Math.floor(random(matrixSize));
      let customY = Math.floor(random(matrixSize));
      matrix[customY][customX] = 6;
   }

   matrix[Math.floor(matrix.length / 2)][Math.floor(matrix[0].length / 2)] = 5;
}

matrixGenerator(55, 30, 10, 10, 8);

function creatingObjects() {
   for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {
         if (matrix[y][x] == 2) {
            var grassEater = new GrassEater(x, y);
            grassEaterArr.push(grassEater);
         }
         else if (matrix[y][x] == 1) {
            let gend  = 0;
            if (x%2!=0) {
               gend = 1;
            }
            var grass = new Grass(x, y,gend);
            grassArr.push(grass);
            grassHashiv++;
         }
         else if (matrix[y][x] == 3) {
            var pred = new Predator(x, y, 3);
            predatorArr.push(pred);
         }
         else if (matrix[y][x] == 6) {
            var hunter = new Hunter(x, y);
            hunterArr.push(hunter);
         }
      }
   }
}
creatingObjects();


var wCount = 0;
function game() {
   //Actions
   if (grassArr[0] !== undefined) {
      for (var i in grassArr) {
         grassArr[i].mul();
      }
   }
   if (grassEaterArr[0] !== undefined) {
      for (var i in grassEaterArr) {
         grassEaterArr[i].eat();
      }
   }
   if (predatorArr[0] !== undefined) {
      for (var i in predatorArr) {
         if (weather != "winter") {
            predatorArr[i].move();
            predatorArr[i].mul();
            predatorArr[i].die();
         }
      }
   }
   if (stoneArr[0] !== undefined) {
      for (var i in stoneArr) {
         stoneArr[i].act();
      }
   }
   if (hunterArr[0] !== undefined) {
      for (var i in hunterArr) {
         hunterArr[i].act();
      }
   }

   //weather
   wCount++;
   if (wCount <= 10) {
      weather = "summer";
   }
   else if (wCount <= 20) {
      weather = "autumn";
   }
   else if (wCount <= 30) {
      weather = "winter";
   }
   else if (wCount < 40) {
      weather = "spring";
   }
   else {
      wCount = 0;
   }
   money += (stoneArr.length) * 2.5;
   //Send
   let sendData = {
      matrix: matrix,
      grassCounter: grassHashiv,
      weather: weather,
      money: money,
      stoneCount: stoneCount,
      notEnoughMoney: false
   }

   io.sockets.emit("data", sendData);
}

setInterval(game, 2000);


// !----Player----! \\

io.on('connection', function (socket) {
   socket.on("player", PlayerAct);
});

var x = Math.floor(matrix.length / 2);
var y = Math.floor(matrix[0].length / 2);
money = 50;
function PlayerAct(player) {

   PlayerMove(player);
   var notEnoughMoney = false;
   if (player.isWall) {
      if (money >= 10) {
         money -= 10;
         GenerateStone(x, y);

      }
   }
   else {
      notEnoughMoney = true;
   }

   if (player.isTrap) {
      if (money >= 30) {
         money -= 30;
         GenerateTrap(x, y);

      }
   }
   else {
      notEnoughMoney = true;

   }

   let sendData = {
      matrix: matrix,
      grassCounter: grassHashiv,
      weather: weather,
      money: money,
      stoneCount: stoneCount,
      notEnoughMoney: notEnoughMoney
   }
   var obj = {
      GrassBorn : grassHashiv,
      StoneBorn : stoneCount
   }
   var myJSON = JSON.stringify(obj);
   fs.writeFile("thing.json", myJSON,function(err, result) {
      if(err) console.log('error', err);
   });

   io.sockets.emit("data", sendData);
}

function PlayerMove(player) {
   let startX = x;
   let startY = y;

   if (player.dir == "up") {
      y--;
   }
   else if (player.dir == "down") {
      y++;
   }
   else if (player.dir == "left") {
      x--;
   }
   else if (player.dir == "right") {
      x++;
   }

   if (matrix[y] == undefined || matrix[y][x] == undefined) {
      x = startX;
      y = startY;
      return;
   }

   matrix[startY][startX] = 0;

   if (matrix[y][x] == 1) {
      destroy(grassArr, x, y);
      money += 5;
   }
   else if (matrix[y][x] == 2) {
      destroy(grassEaterArr, x, y);
      money += 10;

   }
   else if (matrix[y][x] == 3) {
      destroy(predatorArr, x, y);
      money += 15;
   }
   else if (matrix[y][x] == 4) {
      destroy(stoneArr, x, y);
      money += 10;
   }
   else if (matrix[y][x] == 6) {
      destroy(hunterArr, x, y);
      money -= 10;
   }
   matrix[y][x] = 5;
}

function destroy(arr, x, y) {
   for (var i in arr) {
      if (x == arr[i].x && y == arr[i].y) {
         arr.splice(i, 1);
         break;
      }
   }
}

function GenerateStone(x, y) {
   var directions = [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1]
   ];

   var emptyCell = random(chooseCell(0, directions));
   if (emptyCell != null) {
      var stone = new Stone(emptyCell[0], emptyCell[1], 4);
      stoneArr.push(stone);
      matrix[emptyCell[1]][emptyCell[0]] = 4;

      stoneCount++;
   }

}

function chooseCell(char, directions) {
   var found = [];
   for (var i in directions) {
      var x = directions[i][0];
      var y = directions[i][1];
      if (matrix[y] == undefined || matrix[y][x] == undefined)
         continue;

      if (matrix[y][x] == char)
         found.push(directions[i]);

   }
   return found;
}

function GenerateTrap(x, y) {
   var directions = [
      [x - 2, y - 2],
      [x - 1, y - 2],
      [x, y - 2],
      [x + 1, y - 2],
      [x + 2, y - 2],

      [x - 2, y - 1],
      [x - 2, y],
      [x - 2, y + 1],
      [x - 2, y + 2],

      [x - 1, y + 2],
      [x, y + 2],
      [x + 1, y + 2],
      [x + 2, y + 2],

      [x + 2, y - 1],
      [x + 2, y],
      [x + 2, y + 1],
   ];

   var Cell = random(directions);

   var X = Cell[0];
   var Y = Cell[1];

   TrapClear(X, Y);
   TrapClear(X + 1, Y);
   TrapClear(X - 1, Y);
   TrapClear(X, Y + 1);
   TrapClear(X, Y - 1);

   matrix[Y][X] = 8;
}

function TrapClear(x, y) {
   if (matrix[y][x] == 1) {
      destroy(grassArr, x, y);
   }
   else if (matrix[y][x] == 2) {
      destroy(GrassEater, x, y);

   }
   else if (matrix[y][x] == 3) {
      destroy(predatorArr, x, y);
   }
   else if (matrix[y][x] == 4) {
      destroy(stoneArr, x, y);
   }
   else if (matrix[y][x] == 6) {
      destroy(hunterArr, x, y);
   }

   matrix[y][x] = 7;
}

