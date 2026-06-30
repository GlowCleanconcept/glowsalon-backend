exports.healthCheck = (req, res) => {
  res.json({
    status: "OK",
    service: "GlowSalon API"
  });
};