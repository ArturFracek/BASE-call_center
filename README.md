# Panel Operatora Call Center

Aplikacja do obsługi zgłoszeń: lista z filtrem, szczegóły, zmiana statusu. Vue 3 + Express + PostgreSQL.

## Jak uruchomić

**Wymagane:** Node.js 20+, PostgreSQL (zainstalowany i uruchomiony). Bez PostgreSQL skrypt zatrzyma się na krokach bazy. Instalacja i start: **macOS** `brew install postgresql` i `brew services start postgresql`. **Linux (Ubuntu/Debian)** `sudo apt install postgresql postgresql-contrib` i `sudo systemctl start postgresql`. **Windows** instalator z [postgresql.org](https://www.postgresql.org/download/windows/) lub `choco install postgresql` (Chocolatey); serwis startuje zwykle automatycznie.

W katalogu głównym projektu:

```bash
npm install
npm run start
```

Co robi Skrypt: instalacja zależności (backend + frontend), **próba utworzenia bazy** (`createdb call_center` – na Windows często brak w PATH, wtedy utwórz bazę ręcznie przed startem), potem `db:generate`, `db:migrate`, `db:push`, `db:seed`, na końcu uruchomienie backendu i frontendu. Pliki `.env` są w repozytorium.

Gdy baza nie powstanie: `createdb call_center`. W razie potrzeby dostosuj **DATABASE_URL** w **backend/.env** (np. `postgres://twoja_nazwa@localhost:5432/call_center`).

**API:** http://localhost:3000 · **Aplikacja:** http://localhost:5173

**Wdrożenie (za darmo):** frontend → Vercel, backend → Render, baza → Neon. Instrukcja krok po kroku: [DEPLOYMENT.md](./DEPLOYMENT.md).

---

### Uwaga: jeśli `npm run start` nie zadziała – uruchomienie krok po kroku

**1. PostgreSQL**  
Zainstaluj i uruchom serwer PostgreSQL (jeśli jeszcze go nie masz). Bez działającej bazy kolejne kroki się nie powiodą.

**2. Utworzenie bazy danych**  
W terminalu (gdy masz `createdb` w PATH):
```bash
createdb call_center
```
Albo po wejściu do konsoli PostgreSQL (`psql`):
```sql
CREATE DATABASE call_center;
```
Na Windows, jeśli `createdb` nie działa, utwórz bazę w pgAdmin lub przez instalator Postgresa.

**3. Zależności w katalogu głównym**  
W katalogu głównym projektu (tam, gdzie są foldery `backend` i `frontend`):
```bash
npm install
```
Zainstaluje m.in. `concurrently` potrzebne do uruchomienia backendu i frontendu.

**4. Backend**  
W **pierwszym** terminalu:
```bash
cd backend
npm install
```
Otwórz plik `backend/.env` i upewnij się, że **DATABASE_URL** wskazuje na Twoją bazę, np.:
```env
DATABASE_URL=postgres://twoja_nazwa@localhost:5432/call_center
```
Na macOS często użytkownik to wynik polecenia `whoami`, nie `postgres`. Z hasłem: `postgres://twoja_nazwa:haslo@localhost:5432/call_center`.

Następnie w tym samym katalogu `backend`:
```bash
npm run db:generate
npm run db:migrate
npm run db:push
npm run db:seed
npm run dev
```
Serwer API wystartuje (port 3000). **Zostaw ten terminal otwarty.**

**5. Frontend**  
Otwórz **drugi** terminal. W katalogu głównym projektu:
```bash
cd frontend
npm install
npm run dev
```
Vite uruchomi aplikację (zazwyczaj port 5173). Zostaw ten terminal otwarty.

**6. Aplikacja w przeglądarce**  
Wejdź na adres podany przez Vite w terminalu, zwykle **http://localhost:5173**. Powinna wyświetlić się lista zgłoszeń.

