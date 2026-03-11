const decrypt=require("../utils/decrypt");
const generateHash=require("../utils/hash");
const TimeSeries=require("../models/timeSeries");

async function handleStream(stream) {
  const messages = stream.split("|").filter(Boolean);
  let total = 0;
  let valid = 0;
  const saved = [];

  for (const msg of messages) {
    total += 1;

    try {
      const decrypted = decrypt(msg);
      const obj = JSON.parse(decrypted);
      const newHash = generateHash(obj);

      if (newHash === obj.secret_key) {
        const now = new Date();
        const minute = new Date(now);
        minute.setSeconds(0, 0);

        const record = {
          name: obj.name,
          origin: obj.origin,
          destination: obj.destination,
          timestamp: now,
        };

        await TimeSeries.updateOne(
          { minute },
          { $setOnInsert: { minute }, $push: { records: record } },
          { upsert: true }
        );

        saved.push(record);
        valid += 1;
      } else {
        console.log("Invalid data discarded (hash mismatch)");
      }
    } catch (err) {
      console.log("Invalid data discarded (parse/decrypt error)");
    }
  }

  return { total, valid, saved };
}

module.exports=handleStream;
