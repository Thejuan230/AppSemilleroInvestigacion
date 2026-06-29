const path = require("path");

module.exports = {
  port: process.env.PORT || 3000,
  dbPath: process.env.DB_PATH || path.join(__dirname, "..", "database", "abstinencia.db"),
  sessionSecret: process.env.SESSION_SECRET || "dev-secret-change-me",
};
