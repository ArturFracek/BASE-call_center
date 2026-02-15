# Panel Operatora Call Center

Aplikacja do obsługi zgłoszeń: lista z filtrem, szczegóły, zmiana statusu. Vue 3 + Express + PostgreSQL.

## Spis treści

- [Jak uruchomić](#jak-uruchomić)
  - [Opcja A: Docker](#opcja-a-docker-jedna-komenda-bez-instalacji-nodepostgresql)
  - [Opcja B: Lokalnie](#opcja-b-lokalnie-nodejs--postgresql)
  - [Uwaga: uruchomienie krok po kroku](#uwaga-jeśli-npm-run-start-nie-zadziała--uruchomienie-krok-po-kroku)
  - [Testy frontendu](#testy-frontendu)
- [Technologie](#technologie)
- [Funkcjonalności projektu](#funkcjonalności-projektu)

---

## Jak uruchomić

### Opcja A: Docker (jedna komenda, bez instalacji Node/PostgreSQL)

**Wymagane:** [Docker](https://docs.docker.com/get-docker/) i Docker Compose.

W katalogu głównym projektu:

```bash
docker compose up --build
```

Pierwsze uruchomienie zbuduje obrazy i może potrwać kilka minut. Kolejne: `docker compose up`.

**API:** http://localhost:3000 · **Aplikacja:** http://localhost:5173

Dane bazy (hasło `postgres`) są tylko na potrzeby lokalnego developmentu. Zatrzymanie: `Ctrl+C`, potem `docker compose down` (opcjonalnie `docker compose down -v` usuwa dane bazy).

---

### Opcja B: Lokalnie (Node.js + PostgreSQL)

**Wymagane:** Node.js 20+, PostgreSQL (zainstalowany i uruchomiony). Bez PostgreSQL skrypt zatrzyma się na krokach bazy. Instalacja i start: **macOS** `brew install postgresql` i `brew services start postgresql`. **Linux (Ubuntu/Debian)** `sudo apt install postgresql postgresql-contrib` i `sudo systemctl start postgresql`. **Windows** instalator z [postgresql.org](https://www.postgresql.org/download/windows/) lub `choco install postgresql` (Chocolatey); serwis startuje zwykle automatycznie.

W katalogu głównym projektu:

```bash
npm install
npm run start
```

Jeśli pojawi się błąd **ENOENT** lub **spawnSync** – uruchom `npm run start` w **zwykłym terminalu systemowym** (Terminal.app, iTerm, Windows Terminal), nie w zintegrowanym terminalu IDE; albo użyj **Opcji A (Docker)** albo kroków poniżej („Uwaga: jeśli…”).

Skrypt: instalacja zależności (backend + frontend), **próba utworzenia bazy** (`createdb call_center` – na Windows często brak w PATH, wtedy utwórz bazę ręcznie przed startem), potem `db:generate`, `db:migrate`, `db:push`, `db:seed`, na końcu uruchomienie backendu i frontendu. Pliki `.env` są w repozytorium.

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

---

### Testy frontendu

W katalogu **frontend**:

```bash
npm run test        # testy w trybie watch
npm run test:run    # jednorazowe uruchomienie
```

Użyte: Vitest, @vue/test-utils, happy-dom, @pinia/testing. Szczegóły: [frontend/docs/TESTING.md](./frontend/docs/TESTING.md).

---

## Na co zwrócić uwagę

Wartości domyślne (porty, nazwa bazy, klucze env, ścieżki, komendy) są zdefiniowane w stałych i używane w skryptach oraz w backendzie/frontendzie:

- **Stałe w repozytorium:** katalog główny → **`constants.mjs`** (API_PORT_DEFAULT, FRONTEND_PORT_DEFAULT, DB_NAME_DEFAULT, ENV_KEYS, ścieżki `.env`, komendy Docker i testów); backend → **`backend/src/constants.ts`**; frontend → **`frontend/src/constants.ts`** i **`frontend/src/api/index.ts`** (domyślny URL API).

- **Uruchomienie:** Przy błędzie ENOENT/spawn w terminalu IDE użyj terminala systemowego albo **Docker** (`docker compose up --build` — komenda w `constants.mjs`: DOCKER_START_CMD).

- **Baza:** Backend wymaga działającego PostgreSQL i bazy o nazwie z `DB_NAME_DEFAULT` (w `constants.mjs`). W Dockerze baza powstaje automatycznie; lokalnie — `createdb <DB_NAME_DEFAULT>` lub utworzenie bazy ręcznie.

- **Porty:** API — `API_PORT_DEFAULT` (3000), frontend — `FRONTEND_PORT_DEFAULT` (5173). W Dockerze frontend łączy się z API pod `http://localhost:3000` (z poziomu przeglądarki).

- **Konfiguracja:** Backend — `backend/.env` (m.in. `DATABASE_URL`, `DB_NAME`, `PORT`; klucze w ENV_KEYS). Frontend — `frontend/.env` (m.in. `VITE_API_URL`). W repozytorium są przykładowe pliki `.env` / `.env.example`.

- **Testy:** Tylko frontend ma skonfigurowane testy (Vitest). Uruchomienie: w katalogu `frontend` → `npm run test` / `npm run test:run` (TEST_CMD_WATCH, TEST_CMD_RUN w `constants.mjs`).

- **Wdrożenie:** Opis hostingu (Vercel, Render, Neon) — [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## Technologie

### Frontend

- **Vue 3** (Composition API), **Vite 7**, **TypeScript 5** (strict, type-check przez vue-tsc w build)
- **Pinia** – stan aplikacji, **Vue Router 5** – routing
- **Tailwind CSS 4** – stylowanie; **shadcn-vue** – komponenty UI (na bazie Reka UI, ostylowane Tailwind); **Reka UI** – warstwa headless, **Lucide Vue** – ikony
- **CVA** (class-variance-authority), **clsx**, **tailwind-merge** – składanie klas; **tw-animate-css** – animacje
- **TanStack Vue Table** – tabela z sortowaniem/paginacją, **Vue Virtual Scroller** – wirtualna lista kart
- **Vue I18n** – wielojęzyczność (PL/EN), **VueUse** – composables (np. useLocalStorage)
- **Axios** – requesty do API, **Luxon** – daty/czas, **lodash-es** – utilities
- **Sass** – preprocesor CSS (dev)
- **Vitest**, **@vue/test-utils**, **happy-dom** – testy jednostkowe; **ESLint**, **oxlint** – lintowanie

### Backend

- **Node.js**, **Express 5**, **TypeScript**
- **Drizzle ORM** + **drizzle-kit** – schema, migracje, push, seed; **postgres** (driver)
- **Zod** – walidacja wejścia (query, body, params)
- **Pino** – logowanie HTTP i aplikacji, **Helmet** – nagłówki bezpieczeństwa, **CORS**
- **dotenv** – zmienne środowiskowe (`.env`)

---

## Funkcjonalności projektu

- **Lista zgłoszeń (ticketów)** – widok główny z kartami wirtualnej listy, paginacja, sortowanie (np. po dacie, priorytecie).
- **Filtrowanie** – po statusie (otwarte/w toku/zamknięte/wszystkie), wyszukiwanie po treści.
- **Liczniki statusów** – podsumowanie ile zgłoszeń jest w danym statusie (np. w zakładkach lub badge’ach).
- **Szczegóły zgłoszenia** – widok pojedynczego ticketu (route `/ticket/:id`) z pełnymi polami (tytuł, opis, status, priorytet, daty, itd.).
- **Zmiana statusu** – aktualizacja statusu zgłoszenia z poziomu widoku szczegółów (np. otwarte → w toku → zamknięte). Po powrocie do listy **animacja podświetlenia** wskazuje wiersz (kartę) właśnie edytowanego zgłoszenia.
- **Wielojęzyczność** – interfejs po polsku i angielsku (vue-i18n).
- **API REST** – `GET /tickets` (lista z paginacją/filtrami), `GET /tickets/counts` (liczniki), `GET /tickets/:id` (szczegóły), `PATCH /tickets/:id` (zmiana statusu). Walidacja wejścia (Zod), logowanie requestów (Pino).

**Zabiegi optymalizacyjne:** wirtualizacja listy kart (Vue Virtual Scroller – renderowanie tylko widocznych pozycji), paginacja po stronie serwera (limit/offset), sortowanie w DataTable bez zbędnych przeładowań, podświetlenie edytowanego wiersza realizowane przez ref do konkretnego wiersza i krótką klasę CSS (bez przeładowania całej listy). **Keep-alive** na widokach routera – zachowanie stanu listy przy przejściu do szczegółów i z powrotem. **Teleport** dla toastów – powiadomienia renderowane poza drzewem komponentu (np. w `body`), żeby nie wpływały na layout i nakładki.

