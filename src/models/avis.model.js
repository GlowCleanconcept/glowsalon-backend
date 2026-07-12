const mongoose = require("mongoose");

const avisSchema = new mongoose.Schema(
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
    rendezvous: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rendezvous",
      required: true,
      unique: true
    },
    note: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    commentaire: {
      type: String,
      trim: true,
      maxlength: 500
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Avis", avisSchema);
