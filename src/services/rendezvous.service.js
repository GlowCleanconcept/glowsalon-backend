const Rendezvous = require("../models/rendezvous.model");
const Salon = require("../models/salon.model");
const { creerNotification } = require("./notification.service");
const { sendConfirmationRdv } = require("./email.service");

exports.createRendezvous = async (clientId, data) => {
  const { salonId, prestationId, coiffeurId, date, notes } = data;

  const salon = await Salon.findById(salonId);
  if (!salon) throw new Error("Salon introuvable");

  const prestation = salon.prestations.id(prestationId);
  if (!prestation) throw new Error("Prestation introuvable");

  const rdv = await Rendezvous.create({
    client: clientId,
    salon: salonId,
    coiffeur: coiffeurId,
    prestation: {
      nom: prestation.nom,
      prix: prestation.prix,
      duree: prestation.duree
    },
    date,
    notes
  });

  await creerNotification(
    clientId,
    "Rendez-vous créé 📅",
    `Votre rendez-vous pour ${prestation.nom} le ${new Date(date).toLocaleDateString("fr-FR")} a été enregistré.`,
    "rendezvous"
  );

  return rdv.populate(["client", "salon", "coiffeur"]);
};

exports.getMyRendezvous = async (userId) => {
  return await Rendezvous.find({ client: userId })
    .populate("salon", "nom adresse")
    .populate("coiffeur", "firstName lastName")
    .sort({ date: -1 });
};

exports.getAllRendezvous = async (salonId, role) => {
  const filter = role === "superadmin" ? {} : { salon: salonId };
  return await Rendezvous.find(filter)
    .populate("client", "firstName lastName email")
    .populate("salon", "nom adresse")
    .populate("coiffeur", "firstName lastName")
    .sort({ date: -1 });
};

exports.getRendezvousById = async (id) => {
  const rdv = await Rendezvous.findById(id)
    .populate("client", "firstName lastName email")
    .populate("salon", "nom adresse")
    .populate("coiffeur", "firstName lastName");
  if (!rdv) throw new Error("Rendez-vous introuvable");
  return rdv;
};

exports.updateStatut = async (id, statut) => {
  const rdv = await Rendezvous.findByIdAndUpdate(
    id,
    { statut },
    { new: true, runValidators: true }
  ).populate("client", "firstName lastName email");
  if (!rdv) throw new Error("Rendez-vous introuvable");

  const messages = {
    confirme: {
      titre: "Rendez-vous confirmé ✅",
      message: `Votre rendez-vous du ${new Date(rdv.date).toLocaleDateString("fr-FR")} a été confirmé.`,
      type: "rendezvous"
    },
    annule: {
      titre: "Rendez-vous annulé ❌",
      message: `Votre rendez-vous du ${new Date(rdv.date).toLocaleDateString("fr-FR")} a été annulé.`,
      type: "annulation"
    },
    termine: {
      titre: "Rendez-vous terminé 🎉",
      message: `Votre rendez-vous du ${new Date(rdv.date).toLocaleDateString("fr-FR")} est terminé. Merci !`,
      type: "rendezvous"
    }
  };

  if (messages[statut]) {
    await creerNotification(
      rdv.client._id,
      messages[statut].titre,
      messages[statut].message,
      messages[statut].type
    );
  }

  if (statut === "confirme" && rdv.client?.email) {
    sendConfirmationRdv(rdv.client, rdv).catch(err => console.error("Email confirmation:", err.message));
  }

  return rdv;
};

exports.cancelRendezvous = async (id, userId) => {
  const rdv = await Rendezvous.findById(id);
  if (!rdv) throw new Error("Rendez-vous introuvable");
  if (rdv.client.toString() !== userId) throw new Error("Non autorisé");
  if (rdv.statut === "termine") throw new Error("Impossible d'annuler un rendez-vous terminé");
  rdv.statut = "annule";
  await rdv.save();

  await creerNotification(
    userId,
    "Rendez-vous annulé ❌",
    `Votre rendez-vous du ${new Date(rdv.date).toLocaleDateString("fr-FR")} a été annulé.`,
    "annulation"
  );

  return rdv;
};
