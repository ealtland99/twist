const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080; 

app.use(bodyParser.json());

app.post('/db', (req, res) => {
  // Handle the JSON data sent from the extension here
  const receivedData = req.body;
  console.log('Received data:', receivedData);

  // Send a response back if needed
  res.json({ message: 'Data received on the server' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});