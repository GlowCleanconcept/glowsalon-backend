const mongoose = require("mongoose");

const paiementSchema = new mongoose.Schema(
  {
    rendezvous: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rendezvous",
      required: true,
      unique: true
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    salon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salon",
      required: true
    },
    montant: {
      type: Number,
      required: true,
      min: 0
    },
    methode: {
      type: String,
      enum: ["carte", "especes", "mobile"],
      required: true
    },
    statut: {
      type: String,
      enum: ["en_attente", "paye", "rembourse"],
      default: "en_attente"
    },
    reference: {
      type: String,
      unique: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Paiement", paiementSchema);
