const User = require("../models/user.model");

exports.getStats = async (req, res) => {
  try {

    const clients = await User.countDocuments();

    const stats = {
      clients,
      reservations: 0,
      services: 0,
      revenus: 0
    };

    res.json(stats);

  } catch (error) {

    res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });

  }
};