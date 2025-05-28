import React, { useEffect, useState } from "react";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import "./styles.css";

const API_URL = import.meta.env.VITE_API_URL || "/api";

//App() componenta "parinte", aceasta gestioneaza starea principala a aplicatiei si coordoneaza interactiunea dintre BookForm si BookList
function App() {
  const [books, setBooks] = useState([]); // in books luam toate cartile din back-end, le-am initializat ca o lsita goala.

  //functie asincrona care face o cerere GET catre "/api/books"(endpoint din backend)
  const fetchBooks = async () => {
    const res = await fetch(`${API_URL}/books`); //cerere GET
    const data = await res.json(); //backend ul returneaza o lista de carti .JSON
    setBooks(data); // actualizeaza state-ul/starea books cu datele primite
  };
  // acest react hook, se apeleaza o singura data, cand se incarca componenta "parinte" App(), pentru a incarca lista de carti
  useEffect(() => {
    fetchBooks();
  }, []);

  // este un pooling periodic, React face cereri HTTP la backend, la fiecare 5 secunde, INEFICIENT, o idee mai buna ar fi WebSocket cu socket.io
  //dar am zis totusi sa dau eu refresh la pagina:)))
  /*
  ------------------------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/books")
        .then((res) => res.json())
        .then((data) => setBooks(data));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  ------------------------------------------------------------------
*/

  const [selectedBook, setSelectedBook] = useState(null); // obiect care va contine detaliile cartii selectate
  // daca o carte a fost selectata prin butonul Edit, atunci selectedBook nu o sa mai fie null si componenta BookForm afiseaza formularul pentru cartea selectata, pentru edit
  const startEditing = (book) => {
    setSelectedBook(book);
  };

  const finishEditing = () => {
    setSelectedBook(null);
    fetchBooks();
  };

  return (
    <div className="main-body">
      <h1 className="title">Librarie</h1>
      <BookForm book={selectedBook} onFinish={finishEditing} />
      <BookList books={books} onDelete={fetchBooks} onEdit={startEditing} />
    </div>
  );
}

export default App;
