require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const saltRounds = process.env.SALT_ROUNDS;


// Database connection
mongoose.connect('mongodb://localhost:27017/userDB');

const userSchema = {
    email: String,
    password: String
};

const UserModel = mongoose.model('User', userSchema);



app.get('/', (req, res) => {
    res.render('home');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const encryptedPassword = bcrypt.hashSync(req.body.password, Number(saltRounds));
    

    try {
        const user = await UserModel.findOne({
            email: req.body.username,
        });


        if(user) {
            res.redirect('login');
        } else {
            const newUser = new UserModel({
                email: req.body.username,
                password: encryptedPassword
            });
    
            await newUser.save();

            res.render('login');

        }
    } catch (error) {
        res.status(400).end();
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.username,
        });


        if(user) {
            const cmp = bcrypt.compareSync(req.body.password, user.password);

            if(cmp) {
                res.render('secrets');
            } else {
                res.redirect('login');
            }
        } else {
            res.redirect('login');
        }
        
    } catch (error) {
        res.status(400).end();
    }
});

app.get('/secrets', (req, res) => {
    res.render('secrets');
});

app.get('/submit', (req, res) => {
    res.render('submit');
});

app.get('/logout', (req, res) => {
    res.redirect('/');
});


app.listen(3000, function() {
    console.log('listening on port' + 3000);
});