// În BookList.jsx
import React from "react";
import BookForm from "./BookForm";
import "../styles.css";
function BookList({ books, onDelete, onEdit }) {
  const handleDelete = async (id) => {
    await fetch(`/api/books/${id}`, { method: "DELETE" });
    onDelete?.();
  };

  const handleEdit = (book) => {
    onEdit?.(book); //Apeleaza functia startEditing din componenta principala
  };

  return (
    <ul>
      {books.map((book) => (
        <li className="book" key={book.id}>
          <div className="bk-des">
            <strong>Titlu:</strong>
            {book.title} <strong>Autor:</strong>
            {book.author}
          </div>
          <div className="btn">
            <button onClick={() => handleDelete(book.id)}>Sterge</button>
            <button onClick={() => handleEdit(book)}>Editează</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default BookList;
