if (process.env.NODE_ENV === "dev") {
  const dotenv = require("dotenv");
  const { join } = require("path");
  dotenv.config({ path: join(__dirname, "../", ".env") });
}

const express = require("express");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const app = express();
app.set("view engine", "pug")
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GitHubStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},

  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

module.exports = { app, passport }
