import tkinter as tk
from tkinter import messagebox
import json
import os
import uuid
import subprocess
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import threading

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "..", "data", "books.json")


# Asiguram ca fisierul JSON exista
os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
if not os.path.isfile(DATA_FILE):
    with open(DATA_FILE, "w") as f:
        json.dump([], f)

# Functie care sincronizeaza DB-ul PostgreSQL
def sync_with_database():
    try:
        subprocess.run(["node", "../seeds/seedBooks.js"], check=True, capture_output=True, text=True)
        print("Sincronizare cu DB realizata.")
    except subprocess.CalledProcessError as e:
        print("Eroare sincronizare DB:", e.stderr)

def load_data():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_data(data):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

# Detecteaza modificari externe in JSON
class JSONChangeHandler(FileSystemEventHandler):
    def __init__(self, app):
        self.app = app

    def on_modified(self, event):
        if os.path.abspath(event.src_path) == os.path.abspath(DATA_FILE):
            try:
                self.app.data = load_data()
                self.app.refresh_list()
                print("JSON extern modificat. Aplicatia a fost actualizata.")
            except Exception as e:
                print("Eroare la reincarcare JSON:", e)

class CatalogApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Catalog Carti")

        self.data = load_data()
        self.selected_index = None

        self.main_frame = tk.Frame(root)
        self.main_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)

        self.listbox = tk.Listbox(self.main_frame)
        self.listbox.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        self.listbox.bind("<<ListboxSelect>>", self.on_select)

        self.button_frame = tk.Frame(self.main_frame)
        self.button_frame.pack(side=tk.RIGHT, fill=tk.Y)

        tk.Button(self.button_frame, text="Adauga", command=self.add_entry).pack(fill=tk.X)
        tk.Button(self.button_frame, text="Editeaza", command=self.edit_entry).pack(fill=tk.X)
        tk.Button(self.button_frame, text="Sterge", command=self.delete_entry).pack(fill=tk.X)

        self.refresh_list()

    def refresh_list(self):
        self.listbox.delete(0, tk.END)
        for entry in self.data:
            self.listbox.insert(tk.END, f"{entry['title']} - {entry['author']}")

    def on_select(self, event):
        selection = self.listbox.curselection()
        self.selected_index = selection[0] if selection else None

    def add_entry(self):
        EntryForm(self.root, self.save_new_entry)

    def edit_entry(self):
        if self.selected_index is None:
            messagebox.showwarning("Selecteaza", "Selecteaza o carte pentru editare.")
            return
        entry = self.data[self.selected_index]
        EntryForm(self.root, self.save_edited_entry, entry)

    def delete_entry(self):
        if self.selected_index is None:
            messagebox.showwarning("Selecteaza", "Selecteaza o carte pentru stergere.")
            return
        if messagebox.askyesno("Confirmare", "Esti sigur ca vrei sa stergi aceasta carte?"):
            del self.data[self.selected_index]
            save_data(self.data)
            self.refresh_list()
            sync_with_database()

    def save_new_entry(self, new_entry):
        new_entry["id"] = str(uuid.uuid4())
        self.data.append(new_entry)
        save_data(self.data)
        self.refresh_list()
        sync_with_database()

    def save_edited_entry(self, updated_entry):
        old_id = self.data[self.selected_index]["id"]
        updated_entry["id"] = old_id
        self.data[self.selected_index] = updated_entry
        save_data(self.data)
        self.refresh_list()
        sync_with_database()

class EntryForm(tk.Toplevel):
    def __init__(self, master, on_save, data=None):
        super().__init__(master)
        self.title("Formular Carte")
        self.on_save = on_save
        self.geometry("300x150")

        self.label1 = tk.Label(self, text="Titlu")
        self.label1.pack()
        self.entry1 = tk.Entry(self)
        self.entry1.pack(fill=tk.X, padx=10)

        self.label2 = tk.Label(self, text="Autor")
        self.label2.pack()
        self.entry2 = tk.Entry(self)
        self.entry2.pack(fill=tk.X, padx=10)

        if data:
            self.entry1.insert(0, data['title'])
            self.entry2.insert(0, data['author'])

        self.btn = tk.Button(self, text="Salveaza", command=self.save)
        self.btn.pack(pady=10)

    def save(self):
        title = self.entry1.get().strip()
        author = self.entry2.get().strip()
        if not title or not author:
            messagebox.showerror("Eroare", "Toate campurile sunt obligatorii!")
            return
        self.on_save({"title": title, "author": author})
        self.destroy()

if __name__ == '__main__':
    root = tk.Tk()
    root.geometry("800x500")
    app = CatalogApp(root)

    # Porneste watchdog
    event_handler = JSONChangeHandler(app)
    observer = Observer()
    observer.schedule(event_handler, path=os.path.dirname(DATA_FILE), recursive=False)

    def start_observer():
        observer.start()
        observer.join()

    threading.Thread(target=start_observer, daemon=True).start()

    root.mainloop()
    observer.stop()
    observer.join()
