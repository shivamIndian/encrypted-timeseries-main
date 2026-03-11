const crypto = require("crypto");

function generateHash(obj){

 const str = JSON.stringify({
  name:obj.name,
  origin:obj.origin,
  destination:obj.destination
 });

 return crypto.createHash("sha256").update(str).digest("hex");
}

module.exports = generateHash;