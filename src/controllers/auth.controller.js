const authService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    const user = await authService.register(email, password, firstName, lastName, phone);
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.registerCoiffeur = async (req, res) => {
  try {
    const result = await authService.registerCoiffeur(req.body);
    res.status(201).json({ message: "Salon créé avec succès", result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await authService.me(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
