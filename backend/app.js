const express = require("express");
const cors = require("cors");
const booksRouter = require("./routes/books");
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://library.balkancode.ro",
      "http://localhost:5173",
    ],
  })
);
app.use(express.json());

app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`[${req.method}] ${req.originalUrl} → ${res.statusCode}`);
  });
  next();
});

app.use("/api/books", booksRouter);

app.get("/", (req, res) => {
  res.send("Backend API is running. Try /api/books");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
