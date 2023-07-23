const express = require('express');
const cors = require('cors');
const { registerUser } = require('./registerUser');
const { checkUserCredentials } = require('./authentication');
const userRouter = require('./jwtToken');

const app = express();
app.use(cors());

const port = 3000; // Choose a port number for your server

app.use(express.json());

app.get('/api', (req, res) => {
  res.send({ username: 'john_doe', password: 'secretpassword' }); // Send a response with the registration form
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Use the checkUserCredentials function to verify the user credentials
  checkUserCredentials(username, password, (error, isValidUser) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to authenticate user' });
    } else {
      if (isValidUser) {
        res.status(200).json({ success: true, message: 'User authenticated successfully' });
      } else {
        res.status(401).json({ success: false, error: 'Invalid username or password' });
      }
    }
  });
});

app.get('/register', (req, res) => {
  res.send('Registration form'); // Send a response with the registration form
});

// Handle POST requests to /register
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  registerUser(username, password, (error, results) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to register user' });
    } else {
      console.log('Results:', results);
      res.status(200).json({ message: 'User registered successfully' });
    }
  });
});

// Mount the user router
app.use('/user', userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
