const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

router.get("/", protect, restrictTo("admin", "superadmin"), userController.getAllUsers);
router.get("/:id", protect, userController.getUserById);
router.put("/:id", protect, userController.updateUser);
router.delete("/:id", protect, restrictTo("admin", "superadmin"), userController.deleteUser);
router.post("/push-token", protect, userController.savePushToken);

module.exports = router;
