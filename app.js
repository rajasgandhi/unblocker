/*var url = require('url');
var querystring = require('querystring');
var unblocker = require('unblocker');
var Transform = require('stream').Transform;
var express = require('express');
var auth = require('http-auth');

require('dotenv').config();

var basic = auth.basic({
        realm: "Private Area"
    }, (username, password, callback) => {
        callback(username === process.env.USER_NAME && password === process.env.USER_PASSW);
    }
);

basic.on('fail', (result, req) => {
  console.log(`User authentication failed: ${result.user}`);
  process.exit();
});

basic.on('error', (error, req) => {
  console.log(`Authentication error: ${error.code + " - " + error.message}`);
  process.exit();
});

const PORT = process.env.PORT; //|| 5000;

var app = express();

var unblockerConfig = {
    prefix: '/proxy/'
};

app.get("/no-js", function(req, res) {
    // grab the "url" parameter from the querystring
    var site = querystring.parse(url.parse(req.url).query).url;
    // and redirect the user to /proxy/url
    res.redirect(unblockerConfig.prefix + site);
});

app
  .use(auth.connect(basic))
  .use(unblocker(unblockerConfig))
  .use('/', express.static(__dirname + '/public'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
// this is for users who's form actually submitted due to JS being disabled or whatever*/

const express = require('express');
const auth = require('http-auth');

require('dotenv').config();

const basic = auth.basic({
        realm: "Private Area"
    }, (username, password, callback) => {
        callback(username === process.env.USER_NAME && password === process.env.USER_PASSW);
    }
);

basic.on('fail', (result, req) => {
  console.log(`User authentication failed: ${result.user}`);
});

basic.on('error', (error, req) => {
  console.log(`Authentication error: ${error.code + " - " + error.message}`);
});

const PORT = process.env.PORT || 5000;
 
express()
  .use(auth.connect(basic))
  .get('/', (req, res) => res.send(`Hello from express - ${req.user}!`))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));



