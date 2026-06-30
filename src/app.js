const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const indexRoutes = require("./routes/index.routes");

const app = express();

// Sécurité HTTP
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Rate limiting global — 100 requêtes par 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Trop de requêtes, réessayez dans 15 minutes." }
});
app.use(limiter);

// Rate limiting strict pour l'auth — 10 tentatives par 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Trop de tentatives, réessayez dans 15 minutes." }
});
app.use("/api/auth", authLimiter);

// Body parser
app.use(express.json({ limit: "10kb" }));

// Routes
app.use("/api", indexRoutes);

// Route inconnue
app.use((req, res) => {
  res.status(404).json({ error: "Route introuvable" });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur interne du serveur" });
});

module.exports = app;