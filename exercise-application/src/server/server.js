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

const utilities = require('../common/utilities.js');

const serverSecret = crypto.createDiffieHellman(60).generateKeys('base64');
var authenticate = expressJwt({ secret: serverSecret });

app.use(bodyParser.json());
app.use(passport.initialize());

//=========================================================================================//
//                                       Authentication
//=========================================================================================//


// purpose: uses passport-local strategy to handle username/password authentication
passport.use(new strategy( 
  function(username, password, done) {
    // (1) replace the following with data retrieved from database
    // (2) ensure that password is not handled as plaintext
    console.log('fadjshf;asdf')
    if(username === 'admin' && password === 'password'){ 
      done(null, { // stub call to a database; returning fixed info
        id: 42, fname: 'bob', lname: 'no-name'
      });
    }
    else {
      done(null, false);
    }
  }
));

// passport.use(new strategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, (err, user) => {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

// POST requests for '/authenticate' path
app.post('/authenticate', passport.authenticate(
  'local', {
    session: false
  }), serializeUser, generateToken, returnToken);

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
  res.status(200).json({
    user: req.user,
    token: req.token
  });
}

// purpose: update or create user data in database and only return user.id
function serializeUser(req, res, next) {
  console.log('serializeUser');
  db.updateOrCreate(req.user, function(err, user){
    if(err) {return next(err);}
      req.user = {
        id: user.id,
        fname: user.fname,
        lanme: user.lname
      };
      next();
  });
  next();
}

var db = {  
  updateOrCreate: function(user, cb){
    cb(null, user);
  }
};



//=========================================================================================//
//                                          Endpoints
//=========================================================================================//

// POST request for results path
app.post('/api/:id/simplified/results', authenticate, (req, res) => {
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
app.post('/api/:id/simplified/expand', authenticate, (req, res) => {
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
app.post('/api/:id/simplified/qmc', authenticate, (req, res) => {
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
app.get('/api/:id/store', authenticate, (req, res) => {
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

const server = app.listen((process.env.PORT || 8080), () => {
  const port = server.address().port;
  console.log('Node.js server running at localhost:', port);
})
