#!/usr/bin/env node
const Auth = require("@fonos/auth").default;
const { app, passport } = require("./config");

app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req, res) => {
    const auth = new Auth();
    const response = await auth.createToken({ accesKeyId: req.user.username, role: 'USER' });

    res.render("index", {
      title: "PF Server (Demo Server)",
      message: "PF Server (Demo Server)",
      accessKeyId: req.user.username,
      accessKeySecret: response.token
    });
  });

console.log("https://github.com/login/oauth/authorize?client_id=176eada057a4bbd96736");

app.listen(3000);