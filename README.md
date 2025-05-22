# 📚 Biblioteca — aplicație demo React + Express

Un proiect didactic full-stack care arată **cum conectezi un frontend React (Vite) la un backend Express** ce salvează cărți într-un fișier `books.json`.

> Scop: să exersezi CRUD (Create-Read-Update-Delete) cap-coadă, Git + GitHub.

---

## 🗂️ Structură

```text
.
├─ backend/           # server Express + fișier JSON
│  ├─ data/books.json
│  ├─ books.js        # router /api/books
│  └─ server.js
├─ frontend/          # aplicația React (Vite)
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ BookForm.jsx
│  │  │  └─ BookList.jsx
│  │  ├─ App.jsx
│  │  ├─ main.jsx
│  │  └─ style.css    # sau index.css + Tailwind
│  └─ vite.config.js
└─ README.md
