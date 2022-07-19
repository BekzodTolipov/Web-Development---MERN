const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const date = require(__dirname + '/date.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static('public'));

// Database
var newTodoItem = ['Buy Food', 'Cook Food', 'Eat Food'];
var workItems = [];

app.get('/', function(req, res) {
    
    
    var day = date.getDate();
    res.render('list', { listTitle: day, newTodoItem })
});

app.post('/', function(req, res) {
    let item = req.body.new_todo_item;

    if(req.body.list === 'Work') {
        workItems.push(item);
        res.redirect('/work');
    }

    newTodoItem.push(item);
    res.redirect('/');

});

app.get('/work', function(req, res) {
    res.render('list', { listTitle: 'Work List', newTodoItem: workItems});
});

app.post('/work', (req, res) => {
    
    var workItem = req.body.workItem;
    workItems.push(workItem);

    res.redirect('/work');
});




app.listen(3000, function(){
    console.log('listening on: ' + 3000);
})