const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token manquant ou invalide" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ error: "Utilisateur introuvable" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token expiré ou invalide" });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Accès refusé" });
    }
    next();
  };
};

exports.restrictToSalon = (req, res, next) => {
  // Superadmin voit tout
  if (req.user.role === "superadmin") return next();

  // Admin/coiffeur ne voit que son salon
  if (!req.user.salon) {
    return res.status(403).json({ error: "Aucun salon associé à ce compte" });
  }

  req.salonId = req.user.salon.toString();
  next();
};
