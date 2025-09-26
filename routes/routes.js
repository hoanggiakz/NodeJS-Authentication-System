const express = require('express');
const router = express.Router();

// Import any models or middleware you need
// const User = require('../models/User'); // Example

// Sign-in page
router.get('/signin', (req, res) => {
  res.render('signin', { 
    title: 'Sign In',
    message: null,
    error: null
  });
});

// Sign-up page
router.get('/signup', (req, res) => {
  res.render('signup', { 
    title: 'Sign Up',
    message: null,
    error: null
  });
});

// Handle sign-in POST (supports both form-data and JSON)
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt:', { email, password: '***' });
    
    // Add your authentication logic here
    // For demo, simple validation
    if (email && password) {
      // Set session
      req.session.user = { 
        email: email,
        name: 'Test User',
        loginTime: new Date()
      };
      
      // Check if request expects JSON response (API call)
      if (req.headers['content-type'] === 'application/json') {
        return res.status(200).json({
          success: true,
          message: 'Login successful',
          user: req.session.user,
          redirectTo: '/user/dashboard'
        });
      }
      
      // HTML form submission - redirect
      res.redirect('/user/dashboard');
    } else {
      const errorMsg = 'Please provide email and password';
      
      if (req.headers['content-type'] === 'application/json') {
        return res.status(400).json({
          success: false,
          error: errorMsg
        });
      }
      
      res.render('signin', { 
        title: 'Sign In',
        message: null,
        error: errorMsg
      });
    }
  } catch (error) {
    console.error('Sign-in error:', error);
    
    if (req.headers['content-type'] === 'application/json') {
      return res.status(500).json({
        success: false,
        error: 'An error occurred during sign-in'
      });
    }
    
    res.render('signin', { 
      title: 'Sign In',
      message: null,
      error: 'An error occurred during sign-in'
    });
  }
});

// Handle sign-up POST (supports both form-data and JSON)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    
    console.log('Registration attempt:', { name, email, password: '***' });
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      const errorMsg = 'Please fill in all fields';
      
      if (req.headers['content-type'] === 'application/json') {
        return res.status(400).json({
          success: false,
          error: errorMsg
        });
      }
      
      return res.render('signup', { 
        title: 'Sign Up',
        message: null,
        error: errorMsg
      });
    }
    
    if (password !== confirmPassword) {
      const errorMsg = 'Passwords do not match';
      
      if (req.headers['content-type'] === 'application/json') {
        return res.status(400).json({
          success: false,
          error: errorMsg
        });
      }
      
      return res.render('signup', { 
        title: 'Sign Up',
        message: null,
        error: errorMsg
      });
    }
    
    // Add your user creation logic here
    // For demo, just return success
    const successMsg = 'Account created successfully! Please sign in.';
    
    if (req.headers['content-type'] === 'application/json') {
      return res.status(201).json({
        success: true,
        message: successMsg,
        user: {
          name: name,
          email: email
        }
      });
    }
    
    res.render('signup', { 
      title: 'Sign Up',
      message: successMsg,
      error: null
    });
    
  } catch (error) {
    console.error('Sign-up error:', error);
    
    if (req.headers['content-type'] === 'application/json') {
      return res.status(500).json({
        success: false,
        error: 'An error occurred during sign-up'
      });
    }
    
    res.render('signup', { 
      title: 'Sign Up',
      message: null,
      error: 'An error occurred during sign-up'
    });
  }
});

// Dashboard (protected route)
router.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/user/signin');
  }
  
  res.render('dashboard', { 
    title: 'Dashboard',
    user: req.session.user
  });
});

// Profile page
router.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/user/signin');
  }
  
  res.render('profile', { 
    title: 'Profile',
    user: req.session.user
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/user/signin');
  });
});

// API endpoint to get user info (JSON only)
router.get('/api/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      error: 'Not authenticated'
    });
  }
  
  res.json({
    success: true,
    user: req.session.user
  });
});

module.exports = router;