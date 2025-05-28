require("dotenv").config({ path: "../.env" });
const fs = require("fs");
const path = require("path");
const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

const booksFile = path.join(__dirname, "../data/books.json");

async function seedBooks() {
  try {
    // Create table if not exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS books (
        id UUID PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT NOT NULL
      );
    `);

    // Delete
    await db.query("DELETE FROM books");

    // Read
    const data = JSON.parse(fs.readFileSync(booksFile, "utf-8"));

    // Insert in db
    for (const book of data) {
      const id = book.id || uuidv4();
      await db.query(
        `INSERT INTO books (id, title, author)
         VALUES ($1, $2, $3)`,
        [id, book.title, book.author]
      );
    }

    console.log("Seed sincronized");
    process.exit(0);
  } catch (err) {
    console.error("Error seed:", err);
    process.exit(1);
  }
}

seedBooks();
