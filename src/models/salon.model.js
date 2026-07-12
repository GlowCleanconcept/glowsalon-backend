const mongoose = require("mongoose");

const prestationSchema = new mongoose.Schema({
  nom: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  prix: { type: Number, required: true, min: 0 },
  duree: { type: Number, required: true, min: 0 }
});

const horaireSchema = new mongoose.Schema({
  jour: {
    type: String,
    enum: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"],
    required: true
  },
  ouvert: { type: Boolean, default: true },
  ouverture: { type: String, default: "09:00" },
  fermeture: { type: String, default: "18:00" }
});

const photoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true }
});

const salonSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    adresse: {
      rue: { type: String, required: true },
      ville: { type: String, required: true },
      codePostal: { type: String, required: true },
      pays: { type: String, default: "France" }
    },
    telephone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    proprietaire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    prestations: [prestationSchema],
    horaires: [horaireSchema],
    photos: [photoSchema],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Salon", salonSchema);
