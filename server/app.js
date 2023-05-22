const express = require('express')
const passport = require('passport')
const { Strategy } = require('passport-google-oauth20')
const app = express();
const cors = require('cors')
const helmet = require('helmet')
const expressSession = require('express-session')
const dotenv = require('dotenv').config()
const { GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID } = process.env
app.listen(3000, () => {
    console.log(GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID);
    console.log('server is started', 3000);
})
app.use(cors({ origin: true, credentials: true }))
app.use(expressSession({ secret: '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' }))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

passport.use(new Strategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        // if user already exist in your dataabse login otherwise
        // save data and signup
        console.log(profile.displayName, profile.email);
        done(null, {});
    }
));
app.get('/', (req, res) => {
    res.send(`<a href="/auth/google">Login With Google </a>`)
})
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/auth/fail' }),
    (req, res, next) => {

        console.log(req.user, req.isAuthenticated());
        res.json({ message: "success", name: req.user }).status(200)
    })

app.get('/auth/fail', (req, res, next) => {
    res.send('user logged in failed');
    res.json({ message: "failed" }).status(500)
});

app.get('/logout', (req, res, next) => {
    req.logout();
    res.send('user is logged out');
});