const userService = require("../services/user.service");
const User = require("../models/user.model");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers(req.user.salon, req.user.role);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.savePushToken = async (req, res) => {
  try {
    const { pushToken } = req.body;
    if (!pushToken) throw new Error("Token push manquant");
    await User.findByIdAndUpdate(req.user.id, { pushToken });
    res.json({ message: "Token push enregistré" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
