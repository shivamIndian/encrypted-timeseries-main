const socket = io("https://listener-service-41sd.onrender.com");

const listEl = document.getElementById("data");
const MAX_ITEMS = 200;

function renderRate(value) {
  return `${(value * 100).toFixed(2)}%`;
}

socket.on("data", (records) => {
  const items = Array.isArray(records) ? records : [records];

  items.forEach((record) => {
    const li = document.createElement("li");
    li.innerText = JSON.stringify(record);
    listEl.appendChild(li);
  });

  while (listEl.children.length > MAX_ITEMS) {
    listEl.removeChild(listEl.firstChild);
  }
});

socket.on("stats", (stats) => {
  if (!stats) return;

  if (stats.batch) {
    document.getElementById("batch-rate").innerText = renderRate(
      stats.batch.successRate || 0
    );
    document.getElementById("batch-total").innerText = stats.batch.total || 0;
    document.getElementById("batch-valid").innerText = stats.batch.valid || 0;
  }

  if (stats.overall) {
    document.getElementById("overall-rate").innerText = renderRate(
      stats.overall.successRate || 0
    );
    document.getElementById("overall-total").innerText =
      stats.overall.total || 0;
    document.getElementById("overall-valid").innerText =
      stats.overall.valid || 0;
  }
});
