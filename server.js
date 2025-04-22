const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB + Schema
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

connectDB();

// Define schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['admin', 'patient', 'doctor', 'labtech'],
    default: 'patient',
  },
}, { timestamps: true });

const User = mongoose.model('tests', userSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// ✅ Route to handle form submission
app.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = new User({ name, email, password, role });
    await user.save();

    console.log("✅ User registered:", user.email);
    res.status(201).send("✅ User registered successfully!");
  } catch (error) {
    console.error("❌ Failed to register user:", error.message);
    res.status(400).send("❌ Failed to register user. " + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
