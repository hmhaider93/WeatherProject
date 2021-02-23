const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {

    res.sendFile(__dirname + "/index.html");
   
    // res.send(result);
});
app.listen(port, () => {
    console.log(`Example app listening on port port!`);
});

app.post('/', function(req,res){
    const cityName = req.body.cityName
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&APPID=2b774cb1b9bf6e8f9cafe319e1295a05&units=metric"
    var result;
    https.get(url,function(response){
        // result = console.log(response);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const icon = weatherData.weather[0].icon;
            const iconURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(weatherData.main.temp);
            console.log("FEELS LIKE: " + weatherData.main.feels_like);
            console.log("DESCRIPTION: " + weatherData.weather[0].description);
            res.write("<h1>" + weatherData.name + "</h1><p> Feels Like : "+ weatherData.main.feels_like +" degrees Celcius</p><p>Weather Description: " +weatherData.weather[0].description+ "</p>")
            res.write("<img src='"+iconURL+"'>")
            res.send();
        });
    });
});

