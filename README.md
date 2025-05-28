# 📚 Library App

Un proiect full-stack pentru gestionarea unei biblioteci, construit cu **Express.js** pentru backend și **React** pentru frontend. 📖

---

## 🧱 Arhitectură

```
📁 backend
├── data/            # Fișiere de date (JSON sau DB)
├── db/              # Conexiuni și config baza de date
├── routes/          # Rute Express (ex: /api/books)
├── seeds/           # Scripturi pentru popularea bazei
├── tests/           # Teste pentru API
├── utils/           # Utilitare JSON etc.
└── app.js           # Entry point backend

📁 frontend
├── src/
│   ├── components/  # Componente React (form, listă)
│   ├── App.jsx      # Componența principală
│   ├── main.jsx     # Entry point React
│   └── styles.css   # Stiluri globale
└── index.html       # Root HTML
```

---

## 🚀 Cum rulezi proiectul local

### 1. Clonează repository-ul

```bash
git clone https://github.com/username/library.git
cd library
```

---

### 2. Backend (Express + PostgreSQL / JSON)

```bash
cd backend
npm install
node app.js     # Rulează serverul Express
```

📎 Dacă folosești un seed script:
```bash
node seeds/seedBooks.js
```

---

### 3. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev     # Deschide aplicația în browser
```

---

## 🌐 API Endpoints

> Exemplu: `http://localhost:3000/api/books`

| Metodă | Endpoint        | Descriere                     |
|--------|------------------|-------------------------------|
| GET    | `/api/books`     | Returnează toate cărțile      |
| POST   | `/api/books`     | Adaugă o carte nouă           |
| PUT    | `/api/books/:id` | Editează o carte existentă    |
| DELETE | `/api/books/:id` | Șterge o carte                |

---

## 🛠 Tehnologii folosite

- ⚙️ **Backend**: Node.js, Express.js, PostgreSQL / JSON fallback
- ⚛️ **Frontend**: React + Vite
- 🧪 **Testare**: (opțional) Jest / Mocha
- 🗄️ **Persistență**: Local JSON sau PostgreSQL

---

## 💡 Funcționalități

- [x] CRUD complet pentru cărți
- [x] Persistență în JSON sau DB
- [x] Interfață React prietenoasă
- [x] Rute REST moderne
- [ ] Validare de date
- [ ] Autentificare (viitor)

---

## 🤝 Contribuție

Orice PR e binevenit! Poți contribui la:
- Refactorizare cod
- Adăugare autentificare
- Scriere de teste

---

## 📸 Screenshot

> _(Adaugă aici un screenshot din aplicație când ai frontendul gata)_

---

## 📝 Licență

MIT © [Numele tău]
