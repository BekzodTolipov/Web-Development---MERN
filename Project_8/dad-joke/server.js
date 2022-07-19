require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://dad-jokes.p.rapidapi.com/random/joke',
  headers: {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
  }
};




app.get('/', (req, res) => {
    const dadJoke = await axios.request(options).then(function (response) {
        console.log(response.data);
        return response.data;
    }).catch(function (error) {
        return error;
    });

    res.send('Setup: '+ dadJoke.body[0].setup + '<br/><br/>' + 'Punchline: ' + dadJoke.body[0].punchline + '<br>')
});


app.listen('3000', function () {
    console.log('listening on 3000');
})