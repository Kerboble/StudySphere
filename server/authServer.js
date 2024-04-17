const express = require('express'); // Importing Express.js framework
const mongoose = require('mongoose'); // Importing Mongoose for MongoDB interactions
const bcrypt = require('bcryptjs'); // Importing bcrypt for password hashing
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const cors = require('cors'); // Middleware for enabling CORS
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/authMiddleware');



const app = express(); // Creating an Express application
app.use(cors()); // Using CORS middleware to enable cross-origin requests
app.use(bodyParser.json({ limit: '50mb' })); //had to increase the payload amount to accommodate the size of avatar photos

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://frontendfiends:BVT123@studysphere.efmnucf.mongodb.net/?retryWrites=true&w=majority&appName=StudySphere', {
  useNewUrlParser: true, // MongoDB connection options
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected')) // Log successful MongoDB connection
.catch(err => console.error('MongoDB connection error:', err)); // Log MongoDB connection error

// Define User Schema
const UserSchema = new mongoose.Schema({
  username: String, // Define username field as String
  password: String, // Define password field as String
  refreshToken: { type: String, default: '' },
  email: String,
  phoneNumber: String,
  profilePicture: String,
  role:{type: String, default:'student'}
});

const User = mongoose.model('User', UserSchema); // Creating a User model based on the UserSchema

// User Registration
app.post('/register', async (req, res) => {
  try {
    const { username, email,  phoneNumber, password, refreshToken, profilePicture} = req.body;
    const duplicateUser = await User.findOne({username});
    
    //check for usernames in use
    if(duplicateUser) {
      return res.status(400).send('username already in use')}

    const existingUser = await User.findOne({ email }); // Check if user already exists in the database
    if (existingUser) { // If user already exists, return error
      return res.status(400).send('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password using bcrypt
    const newUser = new User({ username, email,  phoneNumber, password: hashedPassword, refreshToken, profilePicture}); // Create a new User document
    await newUser.save(); // Save the new user to the database
    res.status(201).send('User registered successfully'); // Send success response
  } catch (error) {
    console.error('Error registering user:', error); // Log registration error
    res.status(500).send('Error registering user'); // Send error response
  }
});

//when user refreshes userAuth will check for refresh token/ update one if necessary and then return user data
app.post('/userData', authenticateToken, async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const user = await User.findOne({ refreshToken });
    console.log(user)
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Revised generateAccessToken function with longer expiry time
function generateAccessToken(user) {
    const payload = {
        id: user._id,
        username: user.username 
    };
    return jwt.sign(payload, "secret_value", { expiresIn: '60min' }); // Expires in 15 minutes
};


// Revised /login endpoint with refreshToken
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send('Invalid password');
        }
        const accessToken = generateAccessToken(user.toObject());
        const refreshToken = jwt.sign({ id: user._id }, "secret_value"); // Only store user id in refresh token
        await User.updateOne({ _id: user._id }, { $set: { refreshToken: refreshToken } }); // Update refreshToken field
        res.json({ accessToken, refreshToken, user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in');
    }
});

// Refresh token endpoint
app.post('/refresh-token', async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).send('Refresh token not provided');
    }
    try {
        const decoded = jwt.verify(refreshToken, "secret_value");
        console.log(decoded)
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const newAccessToken = generateAccessToken(user.toObject());
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(401).send('Invalid refresh token');
    }
});

//check username availability 
app.post('/checkUsername', async (req, res) => {
  console.log('ping')
  try {
    const { username } = req.body;
    const checkUsernameAvailability = await User.findOne({ username });
    if (checkUsernameAvailability) {
      res.send(false);
    } else {
      res.send(true);
    }
  } catch (error) {
    console.error('Error checking username availability:', error);
    res.status(500).send('Internal Server Error');
  }
});

//gets users for SuperAdmins 
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//this endpoint will allow us to pass in a user to make a super admin
app.post('/set-role', async (req, res) => {
  try {
    const { email, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      await User.updateOne({ email }, { $set: { role: role } });
      res.status(201).send(`user role has been changed to ${role} `);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/delete-user', async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user doesn't exist, return error
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Delete the user document
    await user.deleteOne();

    // Respond with success message
    res.status(200).send('User was successfully deleted');
  } catch (error) {
    // Handle errors
    console.error('Error deleting user:', error);
    res.status(500).send('An error occurred while deleting the user');
  }
});




const PORT = process.env.PORT || 4000; // Define port for the server to listen on
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log server start message
});
