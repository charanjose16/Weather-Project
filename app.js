const express = require("express");
const https = require("https");
const app = express();
const bodyParser =require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
 
    res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
    const query=req.body.cityName;
    const apiKey="696306e4b3f00a364ece7757b27ab6ee";
    const units="metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units+"";
    
    https.get(url,function(response){
    console.log(response.statusCode);
    
     
    response.on("data",function(data){
    
    
    const weatherData=JSON.parse(data);
    const temp =weatherData.main.temp
    const weatherCondition=weatherData.weather[0].description
    const icon=weatherData.weather[0].icon
    
    
    const imageURL=" https://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<h1>The temperature in "+query+" is " + temp + "degree celsius</h1>");
    res.write("<p>The weather is currently" + weatherCondition +"</p>");
    res.write("<img src="+imageURL+"></img>")
    res.send()
    
    });
});


});



app.listen(3000,function(){
    console.log("server is  running in port 3000");
});