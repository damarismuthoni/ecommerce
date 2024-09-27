const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { googleClientID, googleClientSecret } = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id }).then((existingUser) => {
    if (existingUser) {
      return done(null, existingUser);
    }
    const newUser = new User({
      googleId: profile.id,
      email: profile.emails[0].value
    });
    newUser.save().then(user => done(null, user));
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

// Google Auth Routes
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');  // Redirect after successful login
  });

// Local Sign Up Route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      user = new User({
        email,
        password: hashedPassword
      });
  
      // Save user to the database
      await user.save();
  
      // Redirect to login after successful sign-up
      res.redirect('/signin');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


// Local Sign In Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
  
      // Compare the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', {
        expiresIn: '1h'
      });
  
      // Redirect to a dashboard or homepage
      res.redirect('/dashboard'); // or you can send token to frontend
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
// Signup form route (GET request)
router.get('/signup', (req, res) => {
    res.render('signup');  // Render the signup.ejs file
  });
  
// Signin form route (GET request)
router.get('/signin', (req, res) => {
    res.render('signin');  // Render the signin.ejs file
  });
// Dashboard route (GET request)
router.get('/dashboard', (req, res) => {
    res.render('dashboard');  // Render the dashboard.ejs file
  });

module.exports = router;
