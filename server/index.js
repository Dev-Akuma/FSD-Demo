const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');     // <-- 1. Import passport
const cookieParser = require('cookie-parser'); // <-- 2. Import cookie-parser
require('./passportConfig'); // <-- 3. Import your new passport config

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // <-- 4. Use cookie-parser
app.use(passport.initialize()); // <-- 5. Initialize passport

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Successfully connected to MongoDB!"))
  .catch((error) => console.error("❌ Error connecting to MongoDB:", error.message));

// --- Basic Test Route ---
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the Nimbus server!" });
});

// --- TODO: Add Auth Routes (Our next step) ---


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});