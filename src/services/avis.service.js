const Avis = require("../models/avis.model");
const Rendezvous = require("../models/rendezvous.model");

exports.createAvis = async (clientId, data) => {
  const { rendezvousId, salonId, note, commentaire } = data;

  const rdv = await Rendezvous.findById(rendezvousId);
  if (!rdv) throw new Error("Rendez-vous introuvable");
  if (rdv.client.toString() !== clientId) throw new Error("Non autorisé");
  if (rdv.statut !== "termine") throw new Error("Vous ne pouvez laisser un avis que pour un rendez-vous terminé");

  const existant = await Avis.findOne({ rendezvous: rendezvousId });
  if (existant) throw new Error("Vous avez déjà laissé un avis pour ce rendez-vous");

  const avis = await Avis.create({
    client: clientId,
    salon: salonId,
    rendezvous: rendezvousId,
    note,
    commentaire
  });

  return avis;
};

exports.getAvisBySalon = async (salonId) => {
  return await Avis.find({ salon: salonId })
    .populate("client", "firstName lastName")
    .sort({ createdAt: -1 });
};

exports.getNoteMoyenne = async (salonId) => {
  const avis = await Avis.find({ salon: salonId });
  if (avis.length === 0) return { moyenne: 0, total: 0 };
  const moyenne = avis.reduce((sum, a) => sum + a.note, 0) / avis.length;
  return { moyenne: Math.round(moyenne * 10) / 10, total: avis.length };
};

exports.deleteAvis = async (id, clientId) => {
  const avis = await Avis.findById(id);
  if (!avis) throw new Error("Avis introuvable");
  if (avis.client.toString() !== clientId) throw new Error("Non autorisé");
  await avis.deleteOne();
  return { message: "Avis supprimé" };
};
