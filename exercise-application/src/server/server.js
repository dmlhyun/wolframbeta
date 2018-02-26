const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const utilities = require('../common/utilities.js');

app.use(bodyParser.json());

// POST request for results path
app.post('/api/simplified/results', (req, res) => {
  console.log('POST request received');
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

// POST request for results path
app.post('/api/simplified/expand', (req, res) => {
  console.log('POST request received');
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

const server = app.listen((process.env.PORT || 8080), () => {
  const port = server.address().port;
  console.log('Node.js server running at localhost:', port);
})
