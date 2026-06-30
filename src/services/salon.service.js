const Salon = require("../models/salon.model");

exports.createSalon = async (data) => {
  return await Salon.create(data);
};

exports.getAllSalons = async () => {
  return await Salon.find({ isActive: true }).populate("proprietaire", "firstName lastName email");
};

exports.getSalonById = async (id) => {
  const salon = await Salon.findById(id).populate("proprietaire", "firstName lastName email");
  if (!salon) throw new Error("Salon introuvable");
  return salon;
};

exports.updateSalon = async (id, data) => {
  const salon = await Salon.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!salon) throw new Error("Salon introuvable");
  return salon;
};

exports.deleteSalon = async (id) => {
  const salon = await Salon.findByIdAndDelete(id);
  if (!salon) throw new Error("Salon introuvable");
  return salon;
};

// Prestations
exports.addPrestation = async (salonId, prestation) => {
  const salon = await Salon.findById(salonId);
  if (!salon) throw new Error("Salon introuvable");
  salon.prestations.push(prestation);
  await salon.save();
  return salon;
};

exports.deletePrestation = async (salonId, prestationId) => {
  const salon = await Salon.findById(salonId);
  if (!salon) throw new Error("Salon introuvable");
  salon.prestations = salon.prestations.filter(p => p._id.toString() !== prestationId);
  await salon.save();
  return salon;
};