const express = require("express");
const router = express.Router();
const paiementController = require("../controllers/paiement.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");
const { createPaiementValidator } = require("../validators/paiement.validator");
const { validate } = require("../middleware/validate.middleware");

// Client
router.post("/", protect, createPaiementValidator, validate, paiementController.createPaiement);
router.get("/mes-paiements", protect, paiementController.getMyPaiements);
router.get("/rendezvous/:rendezvousId", protect, paiementController.getPaiementByRendezvous);

// Admin
router.get("/", protect, restrictTo("admin"), paiementController.getAllPaiements);
router.patch("/:id/statut", protect, restrictTo("admin"), paiementController.updateStatut);

module.exports = router;