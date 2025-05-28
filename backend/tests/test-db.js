require("dotenv").config({ path: "../.env" });
const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    const result = await db.query("SELECT NOW()");
    console.log("Conexiune reusita la PostgreSQL:", result.rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error("Eroare conexiune:", err);
    process.exit(1);
  }
}

testConnection();
