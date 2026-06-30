const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email invalide"]
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },

    phone: {
      type: String,
      trim: true
    },

    role: {
      type: String,
      enum: ["client", "coiffeur", "admin"],
      default: "client"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);