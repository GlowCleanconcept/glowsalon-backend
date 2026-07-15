const { body } = require("express-validator");

exports.registerValidator = [
  body("email")
    .notEmpty().withMessage("Email requis")
    .isEmail().withMessage("Email invalide"),
  body("password")
    .notEmpty().withMessage("Mot de passe requis")
    .isLength({ min: 6 }).withMessage("Mot de passe minimum 6 caractères"),
  body("firstName")
    .notEmpty().withMessage("Prénom requis")
    .trim(),
  body("lastName")
    .notEmpty().withMessage("Nom requis")
    .trim(),
  body("phone")
    .optional()
];

exports.loginValidator = [
  body("email")
    .notEmpty().withMessage("Email requis")
    .isEmail().withMessage("Email invalide"),
  body("password")
    .notEmpty().withMessage("Mot de passe requis")
];
