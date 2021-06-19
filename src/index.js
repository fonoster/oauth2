#!/usr/bin/env node
const Auth = require("@fonos/auth").default;
const { app, passport } = require("./config");

app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req, res) => {
    const auth = new Auth();
    const response = await auth.createToken({ accessKeyId: req.user.username, roleName: 'USER' });

    res.render("index", {
      title: "PF Server (Demo Server)",
      message: "PF Server (Demo Server)",
      accessKeyId: req.user.username,
      accessKeySecret: response.token,
      endpoint: process.env.ENDPOINT,
    });
  });

app.listen(3000);