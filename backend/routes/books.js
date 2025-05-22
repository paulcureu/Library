const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/books.json");

function loadBooks() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function saveBooks(books) {
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2), "utf-8");
}

router.get("/", (req, res) => {
  const books = loadBooks();
  res.json(books);
});

router.post("/", (req, res) => {
  const books = loadBooks();
  const { title, author } = req.body;
  const newBook = { id: crypto.randomUUID(), title, author };
  books.push(newBook);
  saveBooks(books);
  res.status(201).json(newBook);
});

router.put("/:id", (req, res) => {
  const books = loadBooks();
  const id = req.params.id;
  const { title, author } = req.body;

  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return res.status(404).json({ message: "Not found" });

  books[index] = { ...books[index], title, author };
  saveBooks(books);
  res.json(books[index]);
});

router.delete("/:id", (req, res) => {
  let books = loadBooks();
  const id = req.params.id;
  const initialLength = books.length;

  books = books.filter((b) => b.id !== id);
  if (books.length === initialLength)
    return res.status(404).json({ message: "Not found" });

  saveBooks(books);
  res.json({ message: "Deleted" });
});

module.exports = router;
