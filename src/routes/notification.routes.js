const express = require("express");
const router = express.Router();
const notifController = require("../controllers/notification.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/", protect, notifController.getMesNotifications);
router.get("/non-lues", protect, notifController.getNonLues);
router.patch("/:id/lire", protect, notifController.marquerCommeLu);
router.patch("/lire-tout", protect, notifController.marquerToutCommeLu);
router.delete("/:id", protect, notifController.supprimerNotification);

module.exports = router;