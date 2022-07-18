const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;

// Allows to read request body
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var result = num1 + num2;

    res.send('Result of calculation is ' + result);
});


app.listen(port, function () {
    console.log('Server is running on port ' + port);
});