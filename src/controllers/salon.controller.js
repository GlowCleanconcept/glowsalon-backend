const salonService = require("../services/salon.service");

exports.createSalon = async (req, res) => {
  try {
    const salon = await salonService.createSalon({ ...req.body, proprietaire: req.user.id });
    res.status(201).json(salon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllSalons = async (req, res) => {
  try {
    const salons = await salonService.getAllSalons();
    res.json(salons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSalonById = async (req, res) => {
  try {
    const salon = await salonService.getSalonById(req.params.id);
    res.json(salon);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.updateSalon = async (req, res) => {
  try {
    const salon = await salonService.updateSalon(req.params.id, req.body);
    res.json(salon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSalon = async (req, res) => {
  try {
    await salonService.deleteSalon(req.params.id);
    res.json({ message: "Salon supprimé" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.addPrestation = async (req, res) => {
  try {
    const salon = await salonService.addPrestation(req.params.id, req.body);
    res.status(201).json(salon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePrestation = async (req, res) => {
  try {
    const salon = await salonService.deletePrestation(req.params.id, req.params.prestationId);
    res.json(salon);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) throw new Error("Aucune image fournie");
    const salon = await salonService.uploadPhoto(req.params.id, req.file.buffer, req.file.mimetype);
    res.status(201).json(salon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const salon = await salonService.deletePhoto(req.params.id, req.params.publicId);
    res.json(salon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
