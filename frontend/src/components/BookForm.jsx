import React, { useState, useEffect } from "react";
import "../styles.css";
function BookForm({ book, onFinish }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  //acest hook se ruleaza la montarea componentei sau cand book se schimba
  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
    }
  }, [book]); //sa ruleze de fiecare data cand cartea selectata (book) se schimbă în formular

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author) return alert("Completeaza toate campurile!");
    //(***)daca book != null este editare, daca nu, este adaugare
    if (book) {
      //fetch este o functie care face HTTP(GET,PUT,POST, DELETE)
      // MODIFICARE
      await fetch(`/api/books/${book.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author }),
      });
    } else {
      // ADAUGARE
      await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author }),
      });
    }

    setTitle(""); //dupa submit, se curata campul din formular
    setAuthor(""); //same
    onFinish?.(); //se apeleaza o functie arrow si iese din modul de editare BookForm ul, adica  setSelectedBook(null); si reincarca lista actualizata fetchBooks();
  };

  //(***)
  return (
    <form onSubmit={handleSubmit}>
      <h2>{book ? " Editeaza cartea" : "Adauga carte noua"}</h2>
      <div class="formular">
        <input
          type="text"
          placeholder="Titlu"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <button type="submit">{book ? "Salveaza modificarile" : "Adauga"}</button>
    </form>
  );
}

export default BookForm;
