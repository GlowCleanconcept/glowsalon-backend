const express = require("express");
const router = express.Router();

const { healthCheck } = require("../controllers/health.controller");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const salonRoutes = require("./salon.routes");
const rendezvousRoutes = require("./rendezvous.routes");
const paiementRoutes = require("./paiement.routes");
const notificationRoutes = require("./notification.routes");
const auth = require("../middleware/auth.middleware");

router.get("/health", healthCheck);

// AUTH
router.use("/auth", authRoutes);

// USERS
router.use("/users", userRoutes);

// SALONS
router.use("/salons", salonRoutes);

// RENDEZ-VOUS
router.use("/rendezvous", rendezvousRoutes);

// PAIEMENTS
router.use("/paiements", paiementRoutes);

// NOTIFICATIONS
router.use("/notifications", notificationRoutes);

// Route protégée
router.get("/profile", auth.protect, (req, res) => {
  res.json({
    message: "Accès autorisé 🔐",
    user: req.user
  });
});

module.exports = router;