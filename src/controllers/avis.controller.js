const avisService = require("../services/avis.service");

exports.createAvis = async (req, res) => {
  try {
    const avis = await avisService.createAvis(req.user.id, req.body);
    res.status(201).json(avis);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAvisBySalon = async (req, res) => {
  try {
    const avis = await avisService.getAvisBySalon(req.params.salonId);
    res.json(avis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNoteMoyenne = async (req, res) => {
  try {
    const result = await avisService.getNoteMoyenne(req.params.salonId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAvis = async (req, res) => {
  try {
    const result = await avisService.deleteAvis(req.params.id, req.user.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
