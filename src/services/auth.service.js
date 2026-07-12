const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { sendBienvenue } = require("./email.service");

exports.register = async (email, password, firstName, lastName, phone) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    phone
  });

  // Email de bienvenue (non bloquant)
  sendBienvenue(user).catch(err => console.error("Email bienvenue:", err.message));

  return {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role
  };
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token };
};

exports.me = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new Error("Utilisateur introuvable");
  return {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role
  };
};
