const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/bmiCalculator.html');
});

app.post('/bmicalculator', (req, res) => {
    console.log(req.body);
    var h = Number(req.body.height);
    var w = Number(req.body.weight);
    var result = w/Math.pow(h, 2);

    res.send('Your bmi result is ' + result);
});


app.listen(port, function() {
    console.log('listening on port: ' + port)
});