const crypto = require("crypto");

const algorithm = "aes-256-ctr";
const key = crypto
  .createHash("sha256")
  .update(process.env.STREAM_KEY || "demo-key")
  .digest();

const ivHex =
  process.env.STREAM_IV || "00000000000000000000000000000000";
const iv = Buffer.from(ivHex, "hex");

if (iv.length !== 16) {
  throw new Error("STREAM_IV must be 16 bytes (32 hex chars)");
}

function decrypt(text) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(text, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString();
}

module.exports = decrypt;
