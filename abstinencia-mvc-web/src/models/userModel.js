const db = require("./db");

function createUser({ name, email, passwordHash }) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users(name, email, password_hash) VALUES(?, ?, ?)",
      [name, email, passwordHash],
      function onInsert(err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, name, email });
      }
    );
  });
}

function findByEmail(email) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
      if (err) return reject(err);
      resolve(row || null);
    });
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT id, name, email FROM users WHERE id = ?", [id], (err, row) => {
      if (err) return reject(err);
      resolve(row || null);
    });
  });
}

module.exports = { createUser, findByEmail, findById };
