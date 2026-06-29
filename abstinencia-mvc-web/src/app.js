const express = require("express");
const session = require("express-session");
const path = require("path");
const { port, sessionSecret } = require("./config");
require("./models/db");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  if (req.session.user) return res.redirect("/dashboard");
  return res.redirect("/login");
});

app.use(authRoutes);
app.use(dashboardRoutes);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
  });
}

module.exports = app;
