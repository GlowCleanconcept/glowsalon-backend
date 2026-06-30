const express = require("express");
const router = express.Router();
const rdvController = require("../controllers/rendezvous.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");
const { createRendezvousValidator } = require("../validators/rendezvous.validator");
const { validate } = require("../middleware/validate.middleware");

router.post("/", protect, createRendezvousValidator, validate, rdvController.createRendezvous);
router.get("/mes-rdv", protect, rdvController.getMyRendezvous);
router.patch("/:id/annuler", protect, rdvController.cancelRendezvous);

router.get("/", protect, restrictTo("admin", "coiffeur"), rdvController.getAllRendezvous);
router.get("/:id", protect, restrictTo("admin", "coiffeur"), rdvController.getRendezvousById);
router.patch("/:id/statut", protect, restrictTo("admin", "coiffeur"), rdvController.updateStatut);

module.exports = router;
