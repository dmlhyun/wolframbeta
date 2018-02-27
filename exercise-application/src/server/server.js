const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const utilities = require('../common/utilities.js');

app.use(bodyParser.json());

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

const server = app.listen((process.env.PORT || 8080), () => {
  const port = server.address().port;
  console.log('Node.js server running at localhost:', port);
})
