const notificationService = require("../services/notification.service");

exports.getMesNotifications = async (req, res) => {
  try {
    const notifs = await notificationService.getMesNotifications(req.user.id);
    res.json(notifs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNonLues = async (req, res) => {
  try {
    const result = await notificationService.getNonLues(req.user.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.marquerCommeLu = async (req, res) => {
  try {
    const notif = await notificationService.marquerCommeLu(req.params.id, req.user.id);
    res.json(notif);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.marquerToutCommeLu = async (req, res) => {
  try {
    const result = await notificationService.marquerToutCommeLu(req.user.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.supprimerNotification = async (req, res) => {
  try {
    const result = await notificationService.supprimerNotification(req.params.id, req.user.id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};