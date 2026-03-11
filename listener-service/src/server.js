const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

require("./config/db");

const handleStream = require("./controllers/socketController");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../frontend")));

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

const stats = {
  total: 0,
  valid: 0,
};

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("messageStream", async (stream) => {
    try {
      const { total, valid, saved } = await handleStream(stream);

      stats.total += total;
      stats.valid += valid;

      const batchRate = total ? valid / total : 0;
      const overallRate = stats.total ? stats.valid / stats.total : 0;

      io.emit("stats", {
        batch: { total, valid, successRate: batchRate },
        overall: {
          total: stats.total,
          valid: stats.valid,
          successRate: overallRate,
        },
      });

      if (saved.length > 0) {
        io.emit("data", saved);
      }
    } catch (err) {
      console.error("Stream handling error:", err.message);
    }
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Listener running on port ${port}`);
});
