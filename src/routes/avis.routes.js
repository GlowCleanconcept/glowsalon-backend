const express = require("express");
const router = express.Router();
const avisController = require("../controllers/avis.controller");
const { protect } = require("../middleware/auth.middleware");

// Public
router.get("/salon/:salonId", avisController.getAvisBySalon);
router.get("/salon/:salonId/moyenne", avisController.getNoteMoyenne);

// Connecté
router.post("/", protect, avisController.createAvis);
router.delete("/:id", protect, avisController.deleteAvis);

module.exports = router;
