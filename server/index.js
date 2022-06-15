const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');
const FormData = require('form-data');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'text/*' }));
app.use(bodyParser.urlencoded({ extended: false }));

// Enabled Access-Control-Allow-Origin", "*" in the header so as to by-pass the CORS error.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//This is the redirect URL supplied to Github in turbo-src's Github Oauth App settings.
//Localhost:5000/authenticated in development mode.
//From that page the post request is made below with the code supplied from Github.
app.use('/authenticated', express.static('authenticated'));

app.post('/authenticate', async (req, res) => {
  const { code } = req.body;
  //The code supplied by Github is exchanged for an access token which is used to
  //authenticate the user and return their profile.
  const data = new FormData();
  data.append('client_id', process.env.GITHUB_CLIENT_ID);
  data.append('client_secret', process.env.GITHUB_CLIENT_SECRET);
  data.append('code', code);
  data.append('redirect_uri', process.env.GITHUB_REDIRECT_URI);

  // Request to exchange code for an access token
  fetch(`https://github.com/login/oauth/access_token`, {
    method: 'POST',
    body: data
  })
    .then(response => response.text())
    .then(paramsString => {
      let params = new URLSearchParams(paramsString);
      const access_token = params.get('access_token');

      // Request to return data of a user that has been authenticated
      return fetch(`https://api.github.com/user`, {
        headers: {
          Authorization: `token ${access_token}`
        }
      });
    })
    .then(response => response.json())
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(400).json(error);
    });
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
