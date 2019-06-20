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

let random = require('./modules/random');

matrix = [];

//Arrays
grassArr = [];
grassEaterArr = [];


//Global Variables
grassHashiv = 0;
weather = "summer";




function matrixGenerator(matrixSize, grass, grassEater) {
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
}

matrixGenerator(50, 10, 7);

function creatingObjects() {
   for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {
         if (matrix[y][x] == 2) {
            var grassEater = new GrassEater(x, y);
            grassEaterArr.push(grassEater);
         }
         else if (matrix[y][x] == 1) {
            var grass = new Grass(x, y);
            grassArr.push(grass);
            grassHashiv++;
         }
      }
   }
}
creatingObjects();


var wCount = 0;
function game() {
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
   wCount++;

   if (wCount<=10) {
      weather = "summer";
   }
   else if(wCount<=20){
      weather = "autumn";
   }
   else if(wCount<=30){
      weather = "winter";
   }
   else if(wCount<40){
      weather = "spring";
   }
   else{
      wCount = 0;
   }


   let sendData = {
      matrix: matrix,
      grassCounter: grassHashiv,
      weather: weather
   }


   io.sockets.emit("data", sendData);
}



setInterval(game, 1000);