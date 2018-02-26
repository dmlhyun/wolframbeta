const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const utilities = require('../common/utilities.js');

app.use(bodyParser.json());

// POST request for results path
app.post('/results', (req, res) => {
  console.log('POST request received');
  fs.readFile(__dirname + "/" + "results.json", 'utf8', function (err, data) {
    if (err && err.code == "ENOENT") { // anonymous callback function
      console.error("Invalid filename provided");
      return;
    }
    try {
      const results = JSON.parse(data);
      const expr = req.body.expression;
      let simplified_result = '';
      if (results[expr]) {
        simplified_result = results[expr];
      } else {
        simplified_result = utilities.simplifyExpression(expr);
      }
      res.send(final_result);
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
