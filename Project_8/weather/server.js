require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');

const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.sendFile(__dirname +'/index.html');
});

app.post('/', (req, res) => {
    var query = req.body.cityName || 'Austin';
    var apiKey = process.env.API_KEY;
    var units = 'imperial';
    
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + units;
    const icon_url = 'http://openweathermap.org/img/wn/';    //@2x.png

    https.get(url, function(response) {
        console.log(response);

        response.on('data', function(data) {
            const weatherData = JSON.parse(data);
            const temp = "<h1>Temperature in " + weatherData.name + ", " + weatherData.sys.country + ": " + weatherData.main.temp + " F.</h1>"; 
            const weatherDescription = "<br/><h2>Weather looks: " + weatherData.weather[0].description + "</h2>";
            const icon = "<img src='" + icon_url + weatherData.weather[0].icon + "@2x.png'/>";

            res.write(temp);
            res.write(weatherDescription);
            res.write(icon);
            res.send();
            console.log(weatherData);
        })
    })
    // res.send('Post req recieved');
})








app.listen(port, function() {
    console.log('listening on port: ' + port);
})