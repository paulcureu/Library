const express = require("express");
const db = require("../db/db");
const crypto = require("crypto");
const { loadBooksJSON, saveBooksJSON } = require("../utils/json"); // dacă le muți în `utils/json.js`

const router = express.Router();

// ✅ GET din PostgreSQL
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books");
    res.json(result.rows);
  } catch (err) {
    console.error("GET error:", err);
    res.status(500).json({ error: "Eroare la citire din DB" });
  }
});

// ✅ POST -> PostgreSQL + JSON
router.post("/", async (req, res) => {
  const { title, author } = req.body;
  const id = crypto.randomUUID();
  try {
    const result = await db.query(
      "INSERT INTO books (id, title, author) VALUES ($1, $2, $3) RETURNING *",
      [id, title, author]
    );

    const jsonBooks = loadBooksJSON();
    jsonBooks.push({ id, title, author });
    saveBooksJSON(jsonBooks);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST error:", err);
    res.status(500).json({ error: "Eroare la adăugare" });
  }
});

// ✅ PUT -> PostgreSQL + JSON
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;

  try {
    const result = await db.query(
      "UPDATE books SET title = $1, author = $2 WHERE id = $3 RETURNING *",
      [title, author, id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ message: "Nu există cartea" });

    // sincronizează JSON
    const jsonBooks = loadBooksJSON();
    const index = jsonBooks.findIndex((b) => b.id === id);
    if (index !== -1) {
      jsonBooks[index] = { id, title, author };
      saveBooksJSON(jsonBooks);
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT error:", err);
    res.status(500).json({ error: "Eroare la actualizare" });
  }
});

// ✅ DELETE -> PostgreSQL + JSON
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("DELETE FROM books WHERE id = $1", [id]);
    if (result.rowCount === 0)
      return res.status(404).json({ message: "Nu există cartea" });

    // sincronizează JSON
    let jsonBooks = loadBooksJSON();
    jsonBooks = jsonBooks.filter((b) => b.id !== id);
    saveBooksJSON(jsonBooks);

    res.json({ message: "Carte ștearsă" });
  } catch (err) {
    console.error("DELETE error:", err);
    res.status(500).json({ error: "Eroare la ștergere" });
  }
});

module.exports = router;
