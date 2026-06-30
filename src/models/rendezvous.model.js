const mongoose = require("mongoose");

const rendezvousSchema = new mongoose.Schema(
  {
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
    coiffeur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    prestation: {
      nom: { type: String, required: true },
      prix: { type: Number, required: true },
      duree: { type: Number, required: true }
    },
    date: { type: Date, required: true },
    statut: {
      type: String,
      enum: ["en_attente", "confirme", "annule", "termine"],
      default: "en_attente"
    },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rendezvous", rendezvousSchema);