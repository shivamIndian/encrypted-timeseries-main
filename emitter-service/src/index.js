const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { io } = require("socket.io-client");

const dataPath = path.join(__dirname, "../../data.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

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

const listenerUrl = process.env.LISTENER_URL || "http://localhost:5000";
const socket = io(listenerUrl);

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

function generateHash(payload) {
  const str = JSON.stringify({
    name: payload.name,
    origin: payload.origin,
    destination: payload.destination,
  });
  return crypto.createHash("sha256").update(str).digest("hex");
}

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return encrypted.toString("hex");
}

function buildMessage() {
  const original = {
    name: pick(data.names),
    origin: pick(data.cities),
    destination: pick(data.cities),
  };

  const message = {
    ...original,
    secret_key: generateHash(original),
  };

  return encrypt(JSON.stringify(message));
}

function buildStream() {
  const count = randomInt(49, 499);
  const messages = [];
  for (let i = 0; i < count; i += 1) {
    messages.push(buildMessage());
  }
  return { stream: messages.join("|"), count };
}

function emitStream() {
  const { stream, count } = buildStream();
  socket.emit("messageStream", stream);
  console.log(`Emitted stream with ${count} messages`);
}

socket.on("connect", () => {
  console.log(`Emitter connected to ${listenerUrl}`);
  emitStream();
  setInterval(emitStream, 10_000);
});

socket.on("connect_error", (err) => {
  console.error("Emitter connection error:", err.message);
});
