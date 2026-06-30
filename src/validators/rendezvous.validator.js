const { body } = require("express-validator");

exports.createRendezvousValidator = [
  body("salonId")
    .notEmpty().withMessage("Salon requis")
    .isMongoId().withMessage("ID salon invalide"),
  body("prestationId")
    .notEmpty().withMessage("Prestation requise")
    .isMongoId().withMessage("ID prestation invalide"),
  body("coiffeurId")
    .notEmpty().withMessage("Coiffeur requis")
    .isMongoId().withMessage("ID coiffeur invalide"),
  body("date")
    .notEmpty().withMessage("Date requise")
    .isISO8601().withMessage("Date invalide")
    .custom(value => {
      if (new Date(value) < new Date()) {
        throw new Error("La date doit être dans le futur");
      }
      return true;
    })
];