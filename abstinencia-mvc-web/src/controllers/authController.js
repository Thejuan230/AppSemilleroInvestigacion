const authService = require("../services/authService");

function renderLogin(req, res) {
  res.render("login", { error: null });
}

function renderRegister(req, res) {
  res.render("register", { error: null });
}

async function register(req, res) {
  try {
    const user = await authService.register(req.body);
    req.session.user = user;
    res.redirect("/dashboard");
  } catch (error) {
    res.status(400).render("register", { error: error.message });
  }
}

async function login(req, res) {
  try {
    const user = await authService.login(req.body);
    req.session.user = user;
    res.redirect("/dashboard");
  } catch (error) {
    res.status(401).render("login", { error: error.message });
  }
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
}

module.exports = { renderLogin, renderRegister, register, login, logout };
