const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use('view engine', 'ejs');
app.use(express.static('public'));



app.get('/', (req, res) => {
    res.render('login');
});






app.listen(3000, function() {
    console.log('listening on port' + 3000);
});