const { body } = require("express-validator");

exports.createPaiementValidator = [
  body("rendezvousId")
    .notEmpty().withMessage("Rendez-vous requis")
    .isMongoId().withMessage("ID rendez-vous invalide"),
  body("methode")
    .notEmpty().withMessage("Méthode de paiement requise")
    .isIn(["carte", "especes", "mobile"]).withMessage("Méthode invalide (carte, especes, mobile)")
];