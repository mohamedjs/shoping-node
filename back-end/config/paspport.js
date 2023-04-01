const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Import the user model and other necessary files
const User = require('./models/user');
const secretOrKey = 'your-secret-key-here';

// Configure the local strategy for email and password authentication
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Configure the JWT strategy for token authentication
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey,
}, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload.id);
    if (!user) {
      return done(null, false, { message: 'User not found.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

export default passport;