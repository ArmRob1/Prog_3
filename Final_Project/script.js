
function setup() {

   var socket = io();

   var side = 15;

   var matrix = [];

   // let grassCountElement = document.getElementById('grassCount');
   // let grassEaterCountElement = document.getElementById('grassEaterCount');
   let weatherImg = document.getElementById("weatherImg");
   let weatherTxt = document.getElementById("weatherTxt");
   socket.on("data", drawCreatures);

   function drawCreatures(data) {
      let wetIndent;
      //give matrix from server
      matrix = data.matrix;
      //document.write(data.weather);

      //CreatImage("./images/summer.png",100,100);
      if (data.weather == "summer") {
         weatherImg.src = "./images/summer.png";
         weatherTxt.innerText = "Summer";
         wetIndent = 1;
      }
      else if(data.weather == "autumn"){
         weatherImg.src = "./images/autumn.png";
         weatherTxt.innerText = "Autumn";
         wetIndent = 2;
      }
      else if(data.weather == "winter"){
         weatherImg.src = "./images/winter.png";
         weatherTxt.innerText = "Winter";
         wetIndent = 3;
      }
      else if(data.weather == "spring"){
         weatherImg.src = "./images/spring.png";
         weatherTxt.innerText = "Spring";
         wetIndent = 4;
      }

      //grassCountElement.innerText = data.grassCounter;

      createCanvas(matrix[0].length * side, matrix.length * side);
      background('#acacac');

      for (var i = 0; i < matrix.length; i++) {
         for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
               fill("green");
               rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 2) {
               let col;
               if(wetIndent == 3){
                  col = color(193, 136, 3); 
               }
               else{
                  col = color(235, 255, 25); 
               }
               fill(col);
               rect(j * side, i * side, side, side);
            } 
            else if (matrix[i][j] == 0) {
               fill('#acacac');
               rect(j * side, i * side, side, side);
            }
            // } else if (matrix[i][j] == 3) {
            //    fill('red');
            //    rect(j * side, i * side, side, side);
            // } else if (matrix[i][j] == 4) {
            //    fill('blue');
            //    rect(j * side, i * side, side, side);
            // } else if (matrix[i][j] == 5) {
            //    fill('yellow');
            //    rect(j * side, i * side, side, side);
            // }
         }
      }
   }
}

function ChangeImage(src) {
   var img = document.createElement("img");
   img.src = src;


   document.body.appendChild(img);
}