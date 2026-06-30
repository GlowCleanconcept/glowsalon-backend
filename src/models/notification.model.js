const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    destinataire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    titre: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["rendezvous", "paiement", "annulation", "info"],
      default: "info"
    },
    lu: {
      type: Boolean,
      default: false
    },
    lien: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);