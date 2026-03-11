const mongoose = require("mongoose");

const mongoUri =
  process.env.MONGODB_URI || "mongodb+srv://333sshivam333:Shivam1234@cluster0.ujtck.mongodb.net/encrypted_timeseries?retryWrites=true&w=majority";

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
