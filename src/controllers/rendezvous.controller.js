const rendezvousService = require("../services/rendezvous.service");

exports.createRendezvous = async (req, res) => {
  try {
    const rdv = await rendezvousService.createRendezvous(req.user.id, req.body);
    res.status(201).json(rdv);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMyRendezvous = async (req, res) => {
  try {
    const rdvs = await rendezvousService.getMyRendezvous(req.user.id);
    res.json(rdvs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRendezvous = async (req, res) => {
  try {
    const rdvs = await rendezvousService.getAllRendezvous(req.user.salon, req.user.role);
    res.json(rdvs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRendezvousById = async (req, res) => {
  try {
    const rdv = await rendezvousService.getRendezvousById(req.params.id);
    res.json(rdv);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.updateStatut = async (req, res) => {
  try {
    const rdv = await rendezvousService.updateStatut(req.params.id, req.body.statut);
    res.json(rdv);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.cancelRendezvous = async (req, res) => {
  try {
    const rdv = await rendezvousService.cancelRendezvous(req.params.id, req.user.id);
    res.json(rdv);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
