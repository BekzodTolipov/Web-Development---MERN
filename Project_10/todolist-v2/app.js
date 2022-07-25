require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const _ = require('lodash');


// Database connection
const mongoUser = process.env.mongo_user;
const password = process.env.mongo_password;

mongoose.connect('mongodb+srv://'+ mongoUser +':'+ password +'@cluster0.vstiume.mongodb.net/todolistDB', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static('public'));



// Item
const itemsSchema = {
    name: String,
};

const ItemModel = mongoose.model('Item', itemsSchema);


// List
const listSchema = {
    name: String,
    items:[]
};

const ListModel = mongoose.model('List', listSchema);


app.get('/', async function(req, res) {
    const listOfItems = await ItemModel.find({title: 'Today'});

    res.render('list', { listTitle: "Today", newTodoItem: listOfItems })
});

app.post('/', function(req, res) {
    const item = new ItemModel({
        name: req.body.new_todo_item,
    });

    if(req.body.list == 'Today') {
        item.save();
        res.redirect('/');
    } else {
        ListModel.findOne({name: req.body.list}, (err, foundList) => {
            foundList.items.push(item);
            foundList.save();
            res.redirect('/' + req.body.list);
        });
    }
});

app.get('/:customListName', function(req, res) {
    const customListName = _.capitalize(req.params.customListName);

    var list = {};
    ListModel.findOne({ name: customListName }, async (err, foundList) => {
        if(!foundList) {
            list = new ListModel({
                name: customListName, 
                items: []
            });

            list.save();

            res.render('list', { listTitle: customListName, newTodoItem: [] });
        } else {
            res.render('list', { listTitle: foundList.name, newTodoItem: foundList.items });
        }
    })

});


app.post('/delete/:listName', (req, res) => {
    const itemIdToDelete = req.body.checkbox;
    const listRoute = req.params.listName == 'Today' ? '/' : '/' + req.params.listName;

    console.log(itemIdToDelete)
    console.log(req.params.listName)
    // Find and remove item from items list
    ListModel.findOneAndUpdate({ name: req.params.listName }, {
        $pull: { 
            items: {
                _id: mongoose.Types.ObjectId(itemIdToDelete)
            } 
        }
    }, (err, foundList) => {
        if(!err) {
            res.redirect(listRoute);
        }
    });
});

// Heroku need to read it from env
let port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('listening on: ' + port);
})