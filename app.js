const express = require('express');
const https = require('https');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
     res.send('Hello World!');
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2b774cb1b9bf6e8f9cafe319e1295a05"
    var result;
    https.get(url,function(response){
        result = console.log(response);
    });
    // res.send(result);
});
app.listen(port, () => {
    console.log(`Example app listening on port port!`);
});