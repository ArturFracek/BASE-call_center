# Panel Operatora Call Center

Aplikacja webowa do obsługi zgłoszeń w call center: lista zgłoszeń z filtrowaniem po statusie, szczegóły zgłoszenia oraz zmiana statusu.

**Stack:** Vue 3 (Composition API), Pinia, Vue Router, Sass, TypeScript | Backend: Express, Drizzle ORM, PostgreSQL, Zod.

---

## Wymagania

- **Node.js** 20+ (zalecane 22+)
- **PostgreSQL** – działający serwer i baza danych

---

## Uruchomienie w jednej komendzie (dla rekrutera)

Jeśli masz już **PostgreSQL** i utworzona bazę **call_center**:

1. **W katalogu głównym projektu** (tam, gdzie jest ten README):
   ```bash
   npm install
   npm run start
   ```
2. Jedna komenda `npm run start` po kolei:
   - instaluje zależności w backendzie i frontendzie,
   - kopiuje `backend/.env.example` → `backend/.env` (i opcjonalnie frontend), jeśli brak `.env`,
   - synchronizuje schemę bazy (`db:push`),
   - wstawia 100 rekordów testowych (`db:seed`),
   - uruchamia backend (API) i frontend (Vue) równolegle.

3. **Przed pierwszym uruchomieniem** upewnij się, że:
   - Baza `call_center` istnieje: `createdb call_center` (lub w `psql`: `CREATE DATABASE call_center;`).
   - W pliku **backend/.env** jest ustawione **DATABASE_URL**. Na wielu systemach (np. macOS) użytkownik to Twoja nazwa z `whoami`, np. `postgres://twoja_nazwa@localhost:5432/call_center`.

4. Po starcie:
   - **API:** http://localhost:3000  
   - **Aplikacja:** http://localhost:5173 (Vite poda adres w terminalu).

---

## Uruchomienie krok po kroku

Projekt składa się z **backendu** (API) i **frontendu** (Vue). Poniżej opis ręcznego uruchomienia, jeśli nie korzystasz z `npm run start`.

### 1. Backend

```bash
cd backend
npm install
```

**Konfiguracja**

- Skopiuj plik z przykładowymi zmiennymi:
  ```bash
  cp .env.example .env
  ```
- W pliku `.env` ustaw **DATABASE_URL** (połączenie z PostgreSQL).

  Domyślny przykład:
  ```env
  DATABASE_URL=postgres://postgres@localhost:5432/call_center
  ```
  Na wielu systemach (np. macOS z Homebrew) użytkownik bazy to Twoja nazwa użytkownika systemu, nie `postgres`. Sprawdź: `whoami` w terminalu i użyj:
  ```env
  DATABASE_URL=postgres://TWOJA_NAZWA@localhost:5432/call_center
  ```
  Z hasłem: `postgres://TWOJA_NAZWA:haslo@localhost:5432/call_center`.

**Baza danych**

- Utwórz bazę (jeśli nie istnieje):
  ```bash
  createdb call_center
  ```
  lub w `psql`: `CREATE DATABASE call_center;`

- Zastosuj schemat i wstaw dane testowe:

  **Opcja A – migracje:**
  ```bash
  npm run db:generate
  npm run db:migrate
  npm run db:seed
  ```

  **Opcja B – push (szybka synchronizacja schemy):**
  ```bash
  npm run db:push
  npm run db:seed
  ```

**Start serwera**

```bash
npm run dev
```

API działa pod adresem **http://localhost:3000** (port z `.env`: `PORT=3000`).

---

### 2. Frontend

W **nowym** terminalu:

```bash
cd frontend
npm install
```

**Konfiguracja**

- Skopiuj plik z przykładowymi zmiennymi:
  ```bash
  cp .env.example .env
  ```
- W `.env` upewnij się, że adres API jest poprawny (domyślnie):
  ```env
  VITE_API_URL=http://localhost:3000
  ```

**Start aplikacji**

```bash
npm run dev
```

Frontend uruchomi się zwykle pod **http://localhost:5173** (Vite poda dokładny adres w terminalu).

---

## Sprawdzenie działania

1. Otwórz w przeglądarce adres frontendu (np. http://localhost:5173).
2. Powinna wyświetlić się **Lista zgłoszeń** z tabelą/kartami zgłoszeń i filtrem po statusie (Wszystkie / Nowe / W trakcie / Zamknięte).
3. Kliknij wiersz lub kartę – przejście do **Szczegóły zgłoszenia**.
4. Zmień status w selectcie i kliknij **Zapisz** – po zapisie nastąpi powrót do listy, a zmieniony wiersz krótko się podświetli.

---

## Skrypty (podsumowanie)

| Miejsce   | Skrypt              | Opis                                              |
|----------|----------------------|---------------------------------------------------|
| **root** | `npm run start`      | Setup (install, db:push, db:seed) + uruchomienie |
| **root** | `npm run setup`      | Tylko przygotowanie (install, .env, db:push, seed)|
| **root** | `npm run dev`        | Uruchomienie backendu i frontendu równolegle      |
| backend  | `npm run dev`        | Serwer API (watch)                                |
| backend  | `npm run db:push`    | Synchronizacja schemy z bazą                      |
| backend  | `npm run db:seed`    | Wstawienie danych testowych                       |
| frontend | `npm run dev`        | Aplikacja Vue (Vite)                              |
| frontend | `npm run build`      | Build produkcyjny + type-check                    |

Więcej skryptów backendu (migracje, Drizzle Studio) – patrz `backend/README.md`.
