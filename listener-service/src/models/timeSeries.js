const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    name: String,
    origin: String,
    destination: String,
    timestamp: Date,
  },
  { _id: false }
);

const timeSeriesSchema = new mongoose.Schema(
  {
    minute: { type: Date, index: true },
    records: [recordSchema],
  },
  { versionKey: false }
);

module.exports = mongoose.model("TimeSeries", timeSeriesSchema);
