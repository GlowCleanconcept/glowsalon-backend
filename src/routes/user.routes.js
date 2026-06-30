const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

// Tous les utilisateurs — admin seulement
router.get("/", protect, restrictTo("admin"), userController.getAllUsers);

// Profil par ID — connecté
router.get("/:id", protect, userController.getUserById);

// Modifier — connecté
router.put("/:id", protect, userController.updateUser);

// Supprimer — admin seulement
router.delete("/:id", protect, restrictTo("admin"), userController.deleteUser);

module.exports = router;