const Notification = require("../models/notification.model");

exports.creerNotification = async (destinataireId, titre, message, type = "info", lien = null) => {
  return await Notification.create({
    destinataire: destinataireId,
    titre,
    message,
    type,
    lien
  });
};

exports.getMesNotifications = async (userId) => {
  return await Notification.find({ destinataire: userId })
    .sort({ createdAt: -1 })
    .limit(50);
};

exports.marquerCommeLu = async (id, userId) => {
  const notif = await Notification.findOneAndUpdate(
    { _id: id, destinataire: userId },
    { lu: true },
    { new: true }
  );
  if (!notif) throw new Error("Notification introuvable");
  return notif;
};

exports.marquerToutCommeLu = async (userId) => {
  await Notification.updateMany(
    { destinataire: userId, lu: false },
    { lu: true }
  );
  return { message: "Toutes les notifications marquées comme lues" };
};

exports.getNonLues = async (userId) => {
  const count = await Notification.countDocuments({ destinataire: userId, lu: false });
  return { count };
};

exports.supprimerNotification = async (id, userId) => {
  const notif = await Notification.findOneAndDelete({ _id: id, destinataire: userId });
  if (!notif) throw new Error("Notification introuvable");
  return { message: "Notification supprimée" };
};