const mongoose = require("mongoose");

const mongoUri =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/encrypted_timeseries";

mongoose.set("strictQuery", true);

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

module.exports = mongoose.connection;
