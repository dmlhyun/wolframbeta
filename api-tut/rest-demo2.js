const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());

// GET request for root path
app.get('/', (req, res) => {
  console.log('GET request received');
  res.status(200).json({
    message: 'Welcome',
    links: {
      rel: 'courses',
      href: 'http://localhost:8080/courses'
    }
  });
});

// GET request for courses path
app.get('/courses', (req, res) => {
  console.log('GET request received');
  fs.readFile(__dirname + '/' + 'courses.json', 'utf8', (err, data) => {
    if (err && err.code == 'ENOENT') {
      console.log('Invalid filename provided');
      return;
    } // error handling
    res.end(data);
  }); // __dirname represents current directory
});

// POST request for courses path
app.post('/courses', (req, res) => {
  console.log('POST request received');
  fs.readFile(__dirname + "/" + "courses.json", 'utf8', function (err, data) { // using function construct
    if (err && err.code == "ENOENT") { // anonymous callback function
      console.error("Invalid filename provided");
      return;
    }
    try {
      var courses = JSON.parse(data);
      var newCourse = req.body;
      courses = Object.assign(courses, newCourse);
      res.end(JSON.stringify(courses));
    } catch (err) {
      res.status(400).json({ error: "Invalid service request" });
      console.error("Invalid service request");
      return;
    }
  });
});

const server = app.listen(8080, () => {
  const port = server.address().port;
  console.log('Node.js server running at localhost:', port);
})
