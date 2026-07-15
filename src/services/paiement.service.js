const Paiement = require("../models/paiement.model");
const Rendezvous = require("../models/rendezvous.model");

exports.createPaiement = async (clientId, data) => {
  const { rendezvousId, methode } = data;

  const rdv = await Rendezvous.findById(rendezvousId);
  if (!rdv) throw new Error("Rendez-vous introuvable");
  if (rdv.client.toString() !== clientId) throw new Error("Non autorisé");
  if (rdv.statut !== "confirme") throw new Error("Le rendez-vous doit être confirmé avant paiement");

  const existant = await Paiement.findOne({ rendezvous: rendezvousId });
  if (existant) throw new Error("Un paiement existe déjà pour ce rendez-vous");

  const reference = "PAY-" + Date.now() + "-" + Math.random().toString(36).substr(2, 6).toUpperCase();

  const paiement = new Paiement({
    rendezvous: rendezvousId,
    client: clientId,
    salon: rdv.salon,
    montant: rdv.prestation.prix,
    methode,
    reference
  });

  await paiement.save();
  return paiement;
};

exports.getMyPaiements = async (clientId) => {
  return await Paiement.find({ client: clientId })
    .populate("rendezvous", "date prestation statut")
    .populate("salon", "nom")
    .sort({ createdAt: -1 });
};

exports.getAllPaiements = async (salonId, role) => {
  const filter = role === "superadmin" ? {} : { salon: salonId };
  return await Paiement.find(filter)
    .populate("client", "firstName lastName email")
    .populate("rendezvous", "date prestation statut")
    .populate("salon", "nom")
    .sort({ createdAt: -1 });
};

exports.updateStatut = async (id, statut) => {
  const paiement = await Paiement.findByIdAndUpdate(
    id,
    { statut },
    { new: true, runValidators: true }
  );
  if (!paiement) throw new Error("Paiement introuvable");
  return paiement;
};

exports.getPaiementByRendezvous = async (rendezvousId) => {
  const paiement = await Paiement.findOne({ rendezvous: rendezvousId })
    .populate("client", "firstName lastName email")
    .populate("salon", "nom");
  if (!paiement) throw new Error("Paiement introuvable");
  return paiement;
};
