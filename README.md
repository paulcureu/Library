project:
  name: "📚 Library Project"
  description: >
    Un proiect full-stack pentru gestionarea unei librării — cu 🧠 backend în Express + PostgreSQL 
    și ⚛️ frontend în React + Vite.

structure:
  - folder: backend
    description: "API + baza de date PostgreSQL"
  - folder: frontend
    description: "Interfață React cu Vite"
  - folder: data
    description: "Fișier JSON sincronizat cu baza de date"

functionalities:
  - "🔍 Vizualizare listă cărți"
  - "➕ Adăugare carte nouă"
  - "✏️ Editare carte existentă"
  - "❌ Ștergere carte"
  - "🔁 Sincronizare JSON ↔️ PostgreSQL"

technologies:
  backend:
    - Node.js: "Server backend"
    - Express.js: "Rute API"
    - PostgreSQL: "Bază de date relațională"
    - dotenv: "Configurații ascunse (.env)"
    - cors: "Permisiuni între domenii"
    - uuid: "Generare ID unic"
  frontend:
    - React: "Frontend interactiv"
    - Vite: "Bundler rapid pentru React"

run_local:
  backend:
    env_file: |
      DATABASE_URL=postgresql://user:parola@host:port/dbname
      PORT=3000
    commands:
      - cd backend
      - npm install
      - npm start
  frontend:
    env_file: |
      VITE_API_URL=http://localhost:3000/api
    commands:
      - cd frontend
      - npm install
      - npm run dev

deploy:
  backend:
    platform: Railway
    variables:
      - DATABASE_URL
    notes: "Asigură-te că backend-ul ascultă pe portul corect (3000)"
  frontend:
    platform: Vercel
    variables:
      - VITE_API_URL: "https://nume-backend.railway.app/api"

code_structure:
  - file: routes/books.js
    description: "Rutele API pentru cărți"
  - file: db/db.js
    description: "Conexiune la PostgreSQL"
  - file: seeds/seedBooks.js
    description: "Script inserare cărți demo"
  - file: components/BookForm.jsx
    description: "Formular adăugare/editare"
  - file: components/BookList.jsx
    description: "Listare cărți din DB"
  - file: .env / .env.production
    description: "Config variabile mediu"

notes:
  - "✅ Proxy-ul din vite.config.js e doar pentru dezvoltare"
  - "✅ În producție, folosește VITE_API_URL"

contact:
  method: "GitHub Issues"
  link: "https://github.com"

footer: "📘 Proiect creat cu scop educațional și plăcere de a construi."
