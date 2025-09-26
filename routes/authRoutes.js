const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/user/signin' }),
  (req, res) => {
    // Successful authentication
    req.session.user = {
      id: req.user.id,
      name: req.user.displayName,
      email: req.user.emails[0].value,
      photo: req.user.photos[0].value
    };
    res.redirect('/user/dashboard');
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
      }
      res.redirect('/user/signin');
    });
  });
});

module.exports = router;