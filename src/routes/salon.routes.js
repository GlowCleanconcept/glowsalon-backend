const express = require("express");
const router = express.Router();
const salonController = require("../controllers/salon.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

router.get("/", salonController.getAllSalons);
router.get("/:id", salonController.getSalonById);

router.post("/", protect, restrictTo("admin", "coiffeur"), salonController.createSalon);
router.put("/:id", protect, restrictTo("admin", "coiffeur"), salonController.updateSalon);
router.delete("/:id", protect, restrictTo("admin"), salonController.deleteSalon);

// Prestations
router.post("/:id/prestations", protect, restrictTo("admin", "coiffeur"), salonController.addPrestation);
router.delete("/:id/prestations/:prestationId", protect, restrictTo("admin", "coiffeur"), salonController.deletePrestation);

// Photos
router.post("/:id/photos", protect, restrictTo("admin", "coiffeur"), upload.single("photo"), salonController.uploadPhoto);
router.delete("/:id/photos/:publicId", protect, restrictTo("admin"), salonController.deletePhoto);

module.exports = router;
