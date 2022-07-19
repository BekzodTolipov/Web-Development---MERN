require("dotenv").config();
const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const client = require("mailchimp-marketing");
client.setConfig({
  apiKey: process.env.API_KEY,
  server: "us11",
});



const port = 3000;

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});


app.post('/', (req, res) => {

  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: fname,
        LNAME: lname
      }
    }]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us11.api.mailchimp.com/3.0/lists/" + process.env.MAILING_LIST;
  const options = {
    method: 'POST',
    auth: 'bek:' + process.env.API_KEY
  }

  const run = async () => {
    try {
      const response = await client.lists.addListMember('b83f772720', {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: fname,
          LNAME: lname
        }
      });
      console.log(response);

      res.sendFile(__dirname + '/success.html');
    } catch (e) {
      console.log('========ERROR=======');
      console.log(JSON.parse(e.response.error.text).detail);

      res.render(__dirname + '/failure.html', { error: JSON.parse(e.response.error.text).detail});
    }
  }



  run();
  

});














app.listen(port, function() {
    console.log('listening on port: ' + port);
});
