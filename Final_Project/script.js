let moneyTxt = document.getElementById("money");

function setup() {

   var socket = io.connect('http://localhost:3000');

   var side = 15;

   var matrix = [];

   let grassCountElement = document.getElementById('GrassCount');
   let stoneCountElement = document.getElementById('StoneCount');

   let weatherImg = document.getElementById("weatherImg");
   let weatherTxt = document.getElementById("weatherTxt");

   socket.on("data", drawCreatures);

   function drawCreatures(data) {
      if (data.notEnoughMoney) {
         moneyTxt.style.color = "red";
      }
      else{
         moneyTxt.style.color = "green";
      }
      moneyTxt.innerText = "Money: "+data.money;
      let wetIndent;

      matrix = data.matrix;

      grassCountElement.innerText = "Grass Born : "+data.grassCounter;
      stoneCountElement.innerText = "Stone Born : "+data.stoneCount;

      if (data.weather == "summer") {
         weatherImg.src = "./images/summer.png";
         weatherTxt.innerText = "Summer";
         wetIndent = 1;
      }
      else if (data.weather == "autumn") {
         weatherImg.src = "./images/autumn.png";
         weatherTxt.innerText = "Autumn";
         wetIndent = 2;
      }
      else if (data.weather == "winter") {
         weatherImg.src = "./images/winter.png";
         weatherTxt.innerText = "Winter";
         wetIndent = 3;
      }
      else if (data.weather == "spring") {
         weatherImg.src = "./images/spring.png";
         weatherTxt.innerText = "Spring";
         wetIndent = 4;
      }

      createCanvas(matrix[0].length * side, matrix.length * side);
      background('#acacac');

      for (var i = 0; i < matrix.length; i++) {
         for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
               let col;
               if (wetIndent == 3) {
                  col = color(188, 168, 11);
               }
               else {
                  col = color(7, 178, 24);
               }
               fill(col);
               rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 2) {
               let col;
               col = color(212, 219, 4);
               fill(col);
               rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 3) {
               let col;
               if (wetIndent == 3) {
                  col = color(137, 12, 17);
               }
               else {
                  col = color(198, 11, 18);
               }
               fill(col);
               rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 0) {
               fill('#acacac');
               rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 4) {
               fill('blue');
               rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 6) {
               fill('black');
               rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 7) {
               fill('blue');
               rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 8) {
               let col;
               col = color(11, 4, 114);
               fill(col);
               rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 5) {
               let col;
               col = color(239, 11, 11);
               fill(col);
               rect(j * side, i * side, side, side);
               col = color(255, 255, 255);
               fill(col);
               rect(j * side + side / 4, i * side + side / 4, side / 2, side / 2);
               col = color(10, 239, 235);
               fill(col);
               rect(j * side + 3 * side / 8, i * side + 3 * side / 8, side / 4, side / 4);
            }
         }
      }
   }
   
}



function ChangeImage(src) {
   var img = document.createElement("img");
   img.src = src;


   document.body.appendChild(img);
}


var isWall = false;
var isTrap = false;
function keyPressed() {
   let dir;
   if (key  === 'W') {
      dir = "up";
   }
   else if (key === 'A') {
      dir = "left";

   }
   else if (key === 'S') {
      dir = "down";

   }
   else if (key === 'D') {
      dir = "right";
   }
   else if (key === 'E') {
      isTrap = true;
   }
   
   if (keyCode === SHIFT) {
      isWall = true;
   }
   let sendData = {
      dir: dir,
      isWall: isWall,
      isTrap: isTrap
   }
   var socket = io();
   socket.emit("player", sendData);
   isTrap = false;
   isWall = false;
   dir = undefined;
}

var isNight = false;
function bodyClick(evt){
    if (!isNight) {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        isNight = true;
    }
    else{
        document.body.style.backgroundColor = "white"; 
        document.body.style.color = "black";
        isNight = false;
    }
}
window.onclick = bodyClick;