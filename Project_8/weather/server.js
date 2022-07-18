const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');

const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Austin,TX,USA&appid=57e604004368934628ac72a2bf070244&units=imperial';

    https.get(url, function(response) {
        console.log(response);

        response.on('data', function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            
            console.log(weatherData);
        })
    })
    
    
    res.send('');
});










app.listen(port, function() {
    console.log('listening on port: ' + port);
})