// var express = require("express");
// var app = express();
//
// app.get("/", function(req, res){
//    res.send("Hello world");
// });
//
// app.get("/google", function(req, res){
// 	res.redirect('http://google.com')
//  });
//
// app.get("/google/:search", function(req, res){
// 	var value = req.params.search;
// 	res.redirect('http://google.com/search?q='+value)
//  });
//  app.get("/*", function(req, res){
//    res.send("ERROR 404");
//   });
//
//
// app.listen(3000, function(){
//    console.log("Example is running on port 3000");
// });

var express = require("express");
var app = express();

app.use(express.static("RP"));

app.get("/", function(req, res){
   res.redirect("index.html");
});

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});

// var Grass = require("./RP/Modules/Grass.js");
// var a = new Grass();
