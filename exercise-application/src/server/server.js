const express = require('express'); 
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();

const passport = require('passport');  
const strategy = require('passport-local');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const cryptoJs = require('crypto-js');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

const utilities = require('../common/utilities.js');
const {db_conn, Users}= require('./db.connection.js');

const serverSecret = crypto.createDiffieHellman(60).generateKeys('base64');
const authenticate = expressJwt({ secret: serverSecret });

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cookieParser());


//=========================================================================================//
//                                       Authentication
//=========================================================================================//

passport.use(new strategy(
  function(username, password, done) {
    console.log(username, password)

    Users.findOne({ where: { Name: username} }).then(user => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (password !== user.hash) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// POST request for '/authenticate' path
app.post('/auth', passport.authenticate(
  'local', {
    session: false
  }), generateToken, returnToken);

// purpose: generates a token based on provided user.id; token is set to expire based on expiresIn value
function generateToken(req, res, next) {
  req.token = jwt.sign({
    id: req.user.id,
  }, serverSecret, {
    expiresIn : 60*30 // set to expire in 30 minutes
  });
  next(); // pass on control to the next function
}

// purpose: return generated token to caller
function returnToken(req, res) {
  res.cookie('auth_token', req.token); 
  res.status(200).json({
    user: req.user,
    token: req.token
  });
}


//=========================================================================================//
//                                          Endpoints
//=========================================================================================//

// POST request for results path
app.post('/api/simplified/results', (req, res) => {
  console.log('Results POST request received');
  fs.readFile(__dirname + "/" + "results.json", 'utf8', (err, data) => {
    if (err && err.code == "ENOENT") { // anonymous callback function
      console.error("Invalid filename provided");
      return;
    }
    try {
      const results = JSON.parse(data);
      const expr = req.body.expression;
      let simplified_result;
      if (results[expr]) {
        console.log('Result exists')
        simplified_result = results[expr];
      } else {
        console.log('Result does not exist')
        simplified_result = utilities.simplifyExpression(expr);
        results[expr] = simplified_result; // Create the key and assign the expr to simplified result
        fs.writeFile(__dirname + "/" + "results.json", JSON.stringify(results), 'utf8', (err) => {
          if (err) throw err;
          console.log('Saved new result');
        }); // Writes new key value pair into our JSON 'database'
      }
      res.send(simplified_result);
    } catch (err) {
      res.status(400).json({ error: "Invalid service request" });
      console.error("Invalid service request");
      return;
    }
  });
});

// POST request for expand path
app.post('/api/simplified/expand', (req, res) => {
  console.log('Expand POST request received');
  try {
    const expr = req.body.expression;
    expanded = utilities.expand(expr);
    res.send(expanded);
  } catch (err) {
    res.status(400).json({ error: "Invalid service request" });
    console.error("Invalid service request");
    return;
  }
});

// POST Request for QMC path
app.post('/api/simplified/qmc', (req, res) => {
  console.log('QMC POST request received');
  try {
    const expr = req.body.expression;
    simplified = utilities.qmc(expr);
    res.send(simplified);
  } catch (err) {
    res.status(400).json({ error: "Invalid service request" });
    console.error("Invalid service request");
    return;
  }
});

// GET request for store path
app.get('/api/store', (req, res) => {
  console.log('Results GET request received');
  fs.readFile(__dirname + "/" + "results.json", 'utf8', (err, data) => {
    if (err && err.code == "ENOENT") { // anonymous callback function
      console.error("Invalid filename provided");
      return;
    }
    try {
      const results = JSON.parse(data);
      res.send(results);
    } catch (err) {
      res.status(400).json({ error: "Invalid service request" });
      console.error("Invalid service request");
      return;
    }
  });
});

app.get('/api/allusers', (req, res) => {
  Users.findAll().then(users => {
    res.send(users);
  });
});

const server = app.listen((process.env.PORT || 8080), () => {
  const port = server.address().port;
  console.log('Node.js server running at localhost:', port);
})
