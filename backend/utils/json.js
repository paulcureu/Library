const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "books.json");

function loadBooksJSON() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function saveBooksJSON(books) {
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2), "utf-8");
}

module.exports = { loadBooksJSON, saveBooksJSON };
