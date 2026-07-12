const express = require("express");
const router = express.Router();

const User = require("../models/user.model");


// Statistiques Dashboard
router.get("/stats", async (req, res) => {

  try {

    const totalUsers = await User.countDocuments();

    res.json({
      clients: totalUsers,
      reservations: 0,
      services: 0,
      revenus: 0
    });

  } catch (error) {

    res.status(500).json({
      error: "Erreur serveur"
    });

  }

});


module.exports = router;