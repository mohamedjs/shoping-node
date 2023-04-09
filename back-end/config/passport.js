const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.APP_KEY; // replace with your own secret key

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
        .catch(err => done(err, false));
}));
export default passport;