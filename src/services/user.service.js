const User = require("../models/user.model");

exports.getAllUsers = async (salonId, role) => {
  // Superadmin voit tous les utilisateurs
  if (role === "superadmin") {
    return await User.find().select("-__v");
  }
  // Admin voit uniquement les utilisateurs de son salon
  return await User.find({ salon: salonId }).select("-__v");
};

exports.getUserById = async (id) => {
  const user = await User.findById(id).select("-__v");
  if (!user) throw new Error("Utilisateur introuvable");
  return user;
};

exports.updateUser = async (id, data) => {
  const allowed = ["firstName", "lastName", "phone", "isActive", "role"];
  const updates = {};
  allowed.forEach(field => {
    if (data[field] !== undefined) updates[field] = data[field];
  });

  const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  if (!user) throw new Error("Utilisateur introuvable");
  return user;
};

exports.deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error("Utilisateur introuvable");
  return user;
};
