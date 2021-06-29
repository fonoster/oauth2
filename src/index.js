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

    if (process.env.ACCESS_LIST) {
      const allowedUsers = process.env.ACCESS_LIST.split(",");
      if (!allowedUsers.includes(req.user.username)) {
        res.render("unauthorized", {
          message: `The username "${req.user.username}" is not in access list. Please contact administrator.`
        });
        return
      }
    }

    res.render("index", {
      title: process.env.PAGE_TITLE || "PF Access Information",
      message: process.env.PAGE_MESSAGE || "PF Access Information",
      accessKeyId: req.user.username,
      accessKeySecret: response.token,
      endpoint: process.env.ENDPOINT,
    });
  });

app.listen(3000);