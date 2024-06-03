require("dotenv").config();
const mongoose = require("mongoose");

// MongoDB connection string from environment variable
const uri = process.env.MONGODB_URI;

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 7200000, // Timeout after 2 hours (7200000 ms)
  socketTimeoutMS: 7200000, // Close sockets after 2 hours (7200000 ms) of inactivity
  connectTimeoutMS: 7200000, // Timeout after 2 hours (7200000 ms) if not connected
};

// Connect to MongoDB
mongoose
  .connect(uri, options)
  .then(() => console.log("db connected!"))
  .catch((err) => console.error("Connection error", err));

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// When the connection is successfully opened
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
