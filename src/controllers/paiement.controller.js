const paiementService = require("../services/paiement.service");

exports.createPaiement = async (req, res) => {
  try {
    const paiement = await paiementService.createPaiement(req.user.id, req.body);
    res.status(201).json(paiement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMyPaiements = async (req, res) => {
  try {
    const paiements = await paiementService.getMyPaiements(req.user.id);
    res.json(paiements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPaiements = async (req, res) => {
  try {
    const paiements = await paiementService.getAllPaiements(req.user.salon, req.user.role);
    res.json(paiements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatut = async (req, res) => {
  try {
    const paiement = await paiementService.updateStatut(req.params.id, req.body.statut);
    res.json(paiement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPaiementByRendezvous = async (req, res) => {
  try {
    const paiement = await paiementService.getPaiementByRendezvous(req.params.rendezvousId);
    res.json(paiement);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
