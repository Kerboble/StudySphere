const express = require('express'); // Importing Express.js framework
const mongoose = require('mongoose'); // Importing Mongoose for MongoDB interactions
const bcrypt = require('bcryptjs'); // Importing bcrypt for password hashing
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const cors = require('cors'); // Middleware for enabling CORS

const app = express(); // Creating an Express application
app.use(cors()); // Using CORS middleware to enable cross-origin requests
app.use(bodyParser.json()); // Using bodyParser middleware to parse JSON request bodies

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://frontendfiends:6lCbNr0xOdhPlIYw@studysphere.efmnucf.mongodb.net/?retryWrites=true&w=majority&appName=StudySphere', {
  useNewUrlParser: true, // MongoDB connection options
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected')) // Log successful MongoDB connection
.catch(err => console.error('MongoDB connection error:', err)); // Log MongoDB connection error

// Define User Schema
const UserSchema = new mongoose.Schema({
  username: String, // Define username field as String
  password: String, // Define password field as String
});

const User = mongoose.model('User', UserSchema); // Creating a User model based on the UserSchema

// User Registration
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body; // Extract username and password from request body
    const existingUser = await User.findOne({ username }); // Check if user already exists in the database
    if (existingUser) { // If user already exists, return error
      return res.status(400).send('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password using bcrypt
    const newUser = new User({ username, password: hashedPassword }); // Create a new User document
    await newUser.save(); // Save the new user to the database
    res.status(201).send('User registered successfully'); // Send success response
  } catch (error) {
    console.error('Error registering user:', error); // Log registration error
    res.status(500).send('Error registering user'); // Send error response
  }
});

// User Login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body; // Extract username and password from request body
    const user = await User.findOne({ username }); // Find user by username in the database
    if (!user) { // If user not found, return error
      return res.status(404).send('User not found');
    }
    const validPassword = await bcrypt.compare(password, user.password); // Compare passwords using bcrypt
    if (!validPassword) { // If password is invalid, return error
      return res.status(401).send('Invalid password');
    }
    res.status(200).send('Login successful'); // Send success response
  } catch (error) {
    console.error('Error logging in:', error); // Log login error
    res.status(500).send('Error logging in'); // Send error response
  }
});

const PORT = process.env.PORT || 3000; // Define port for the server to listen on
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log server start message
});
