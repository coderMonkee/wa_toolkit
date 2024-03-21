// Import necessary modules
const express = require('express');

// Create an instance of Express
const app = express();
const port = 3000; // Choose the port you want to run your server on

// Define a route
app.get('/', (req, res) => {

  console.log("Get api call",req.query);
  res.send('Hello World!');
});
 
app.post('/', (req, res) => {
  console.log("Post api call",req.body);
  res.send('Hello World!');
});
// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

