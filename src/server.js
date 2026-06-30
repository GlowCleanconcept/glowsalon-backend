require("dotenv").config();
console.log("JWT_SECRET défini:", !!process.env.JWT_SECRET);
console.log("MONGO_URI défini:", !!process.env.MONGO_URI);

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});