const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

async function register({ name, email, password }) {
  if (!name || !email || !password) throw new Error("Todos los campos son obligatorios");
  if (password.length < 6) throw new Error("La contrasena debe tener al menos 6 caracteres");

  const existing = await userModel.findByEmail(email);
  if (existing) throw new Error("Ya existe una cuenta con ese correo");

  const passwordHash = await bcrypt.hash(password, 10);
  return userModel.createUser({ name, email, passwordHash });
}

async function login({ email, password }) {
  const user = await userModel.findByEmail(email);
  if (!user) throw new Error("Credenciales invalidas");

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error("Credenciales invalidas");

  return { id: user.id, name: user.name, email: user.email };
}

module.exports = { register, login };
