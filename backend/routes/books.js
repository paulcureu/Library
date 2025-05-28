const express = require("express");
const db = require("../db/db");
const crypto = require("crypto");

const router = express.Router();

// ✅ GET all books
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books");
    res.json(result.rows);
  } catch (err) {
    console.error("Eroare la GET /books:", err);
    res.status(500).json({ error: "Eroare la interogare baza de date" });
  }
});

// ✅ POST book
router.post("/", async (req, res) => {
  const { title, author } = req.body;
  const id = crypto.randomUUID();
  try {
    const result = await db.query(
      "INSERT INTO books (id, title, author) VALUES ($1, $2, $3) RETURNING *",
      [id, title, author]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Eroare la POST /books:", err);
    res.status(500).json({ error: "Eroare la adăugare" });
  }
});

// ✅ PUT book
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  try {
    const result = await db.query(
      "UPDATE books SET title = $1, author = $2 WHERE id = $3 RETURNING *",
      [title, author, id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ message: "Carte inexistentă" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Eroare la PUT /books:", err);
    res.status(500).json({ error: "Eroare la actualizare" });
  }
});

// ✅ DELETE book
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("DELETE FROM books WHERE id = $1", [id]);
    if (result.rowCount === 0)
      return res.status(404).json({ message: "Carte inexistentă" });
    res.json({ message: "Carte ștearsă" });
  } catch (err) {
    console.error("Eroare la DELETE /books:", err);
    res.status(500).json({ error: "Eroare la ștergere" });
  }
});

module.exports = router;
