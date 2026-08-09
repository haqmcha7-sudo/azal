// Regenerates js/data.js from info.json
// Usage: node tools/build-data.js
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const data = JSON.parse(fs.readFileSync(path.join(root, "info.json"), "utf8"));
const out =
  "/* Generated from info.json — edit info.json, not this file.\n" +
  "   Regenerate with: node tools/build-data.js */\n" +
  "window.AZAL_DATA = " +
  JSON.stringify(data, null, 2) +
  ";\n";
fs.writeFileSync(path.join(root, "js", "data.js"), out);
console.log("js/data.js regenerated from info.json");
