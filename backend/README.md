# Backend – Panel Call Center

API: Express, Drizzle ORM, PostgreSQL, Zod.

## Wymagania

- Node.js 18+
- PostgreSQL (działający serwer, baza `call_center`)

## Uruchomienie (kolejność)

### 1. Zależności

```bash
cd backend
npm install
```

### 2. Konfiguracja

Skopiuj `.env.example` do `.env` i uzupełnij:

```bash
cp .env.example .env
```

**Połączenie z bazą:** Aplikacja i Drizzle Kit używają `DATABASE_URL`. W `.env` ustaw poprawną wartość.

Jeśli pojawia się błąd **`role "postgres" does not exist`**: na wielu instalacjach (np. Homebrew na Macu) domyślna rola w PostgreSQL to Twoja nazwa użytkownika systemu, nie `postgres`. Sprawdź: `whoami` w terminalu i użyj tej nazwy w URL:

```env
# Zastąp TWOJA_NAZWA wynikiem z: whoami
DATABASE_URL=postgres://TWOJA_NAZWA@localhost:5432/call_center
```

Przykład: użytkownik `artur` → `postgres://artur@localhost:5432/call_center`. Z hasłem: `postgres://artur:haslo@localhost:5432/call_center`.

### 3. Baza danych

Utwórz bazę (jeśli nie istnieje):

```bash
createdb call_center
# lub w psql: CREATE DATABASE call_center;
```

**Opcja A – migracje (zalecane, wersjonowana schema):**

```bash
npm run db:generate   # generuje pliki migracji w drizzle/
npm run db:migrate    # stosuje migracje do bazy
npm run db:seed       # wstawia 10 zgłoszeń
```

**Opcja B – push (szybkie, bez plików migracji):**

```bash
npm run db:push       # synchronizuje schemę z bazy z kodem
npm run db:seed       # wstawia 10 zgłoszeń
```

### 4. Build i start

```bash
npm run build
npm run dev
```

Serwer nasłuchuje na `PORT` z `.env` (domyślnie 3000).

## Skrypty

| Skrypt       | Opis                                          |
|-------------|-------------------------------------------------|
| `npm run dev` | Serwer w trybie watch (tsx)                   |
| `npm run build` | Kompilacja TypeScript                        |
| `npm run start` | Uruchomienie z `dist/`                       |
| `npm run db:generate` | Generuje pliki migracji z schemy (drizzle/); wymaga tsx (ładowanie .ts) |
| `npm run db:migrate` | Stosuje migracje do bazy                    |
| `npm run db:push` | Synchronizuje schemę z bazy bez migracji (wymaga tsx)     |
| `npm run db:seed` | Seed 10 zgłoszeń                             |
| `npm run db:studio` | Drizzle Studio (UI)                         |

## API

- `GET /api/tickets` – lista (query: `status`, `limit`, `offset`, `search`)
- `GET /api/tickets/:id` – szczegóły zgłoszenia
- `PATCH /api/tickets/:id` – zmiana statusu (body: `{ "status": "new"|"in_progress"|"closed" }`)
