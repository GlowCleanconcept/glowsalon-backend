const Salon = require("../models/salon.model");
const cloudinary = require("../config/cloudinary");

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

// Upload photo
exports.uploadPhoto = async (salonId, fileBuffer, mimetype) => {
  const salon = await Salon.findById(salonId);
  if (!salon) throw new Error("Salon introuvable");

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "glowsalon/salons",
        resource_type: "image",
        transformation: [{ width: 1200, height: 800, crop: "fill", quality: "auto" }]
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(fileBuffer);
  });

  if (!salon.photos) salon.photos = [];
  salon.photos.push({
    url: result.secure_url,
    publicId: result.public_id
  });

  await salon.save();
  return salon;
};

// Supprimer photo
exports.deletePhoto = async (salonId, publicId) => {
  const salon = await Salon.findById(salonId);
  if (!salon) throw new Error("Salon introuvable");

  await cloudinary.uploader.destroy(publicId);

  salon.photos = salon.photos.filter(p => p.publicId !== publicId);
  await salon.save();
  return salon;
};
