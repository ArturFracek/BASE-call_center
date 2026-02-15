import "dotenv/config";
import { db } from "./index.js";
import { tickets } from "../modules/tickets/dbSchema/dbTicketsSchema.js";
import logger from "../helpers/logger.js";

type TTicketPriority = "low" | "medium" | "high";
type TTicketStatus = "new" | "in_progress" | "closed";

const CUSTOMER_NAMES = [
  "Jan Kowalski",
  "Anna Nowak",
  "Piotr Wiśniewski",
  "Maria Dąbrowska",
  "Tomasz Lewandowski",
  "Katarzyna Kamińska",
  "Michał Zieliński",
  "Ewa Szymańska",
  "Adam Woźniak",
  "Magdalena Kozłowska",
  "Paweł Jankowski",
  "Aleksandra Wojcik",
  "Krzysztof Kowalczyk",
  "Joanna Mazur",
  "Andrzej Król",
  "Monika Piotrowska",
  "Marcin Grabowski",
  "Natalia Kaczmarek",
  "Jakub Rutkowski",
  "Agata Duda",
];

const SUBJECTS = [
  "Problem z logowaniem",
  "Awaria drukarki",
  "Zapytanie o fakturę",
  "Zmiana hasła",
  "Wolne działanie systemu",
  "Dostęp do nowego modułu",
  "Błąd przy zapisie",
  "Pytanie o integrację",
  "Zawieszenie konta",
  "Aktualizacja danych",
  "Konfiguracja email",
  "Brak dostępu do raportów",
  "Eksport danych do CSV",
  "Synchronizacja kalendarza",
  "Reset uprawnień",
  "Instalacja na nowym PC",
  "Błąd 404 na podstronie",
  "Prośba o szkolenie",
  "Integracja z API",
  "Przedłużenie licencji",
];

const DESCRIPTIONS = [
  "Nie mogę się zalogować do systemu od wczoraj.",
  "Drukarka w biurze nie drukuje od rana.",
  "Proszę o przesłanie faktury za ostatni miesiąc.",
  "Nie pamiętam hasła do konta, potrzebuję resetu.",
  "Aplikacja bardzo się przycina przy otwieraniu raportów.",
  "Proszę o nadanie uprawnień do modułu CRM.",
  "Po zapisaniu formularza pojawia się komunikat 500.",
  "Czy system obsługuje eksport do Excel?",
  "Moje konto zostało zablokowane bez podania przyczyny.",
  "Proszę o aktualizację numeru NIP w systemie.",
  "Nie mogę skonfigurować skrzynki pocztowej.",
  "Raporty nie ładują się od dwóch dni.",
  "Eksport przerywa się w połowie.",
  "Kalendarz nie synchronizuje z Outlook.",
  "Uprawnienia zniknęły po aktualizacji.",
  "Instalator nie uruchamia się na Windows 11.",
  "Strona zwraca błąd 404.",
  "Chciałbym umówić szkolenie dla zespołu.",
  "Dokumentacja API zwraca nieaktualne dane.",
  "Licencja wygasa za tydzień, proszę o przedłużenie.",
];

const PRIORITIES: TTicketPriority[] = ["high", "medium", "low"];
const STATUSES: TTicketStatus[] = ["new", "in_progress", "closed"];

const SEED_COUNT = 100;

function buildSeedTickets(): Array<{
  customerName: string;
  subject: string;
  description: string;
  priority: TTicketPriority;
  status: TTicketStatus;
}> {
  return Array.from({ length: SEED_COUNT }, (_, i) => ({
    customerName: CUSTOMER_NAMES[i % CUSTOMER_NAMES.length],
    subject: `${SUBJECTS[i % SUBJECTS.length]} #${i + 1}`,
    description: DESCRIPTIONS[i % DESCRIPTIONS.length],
    priority: PRIORITIES[i % PRIORITIES.length],
    status: STATUSES[i % STATUSES.length],
  }));
}

const seedTickets = buildSeedTickets();

const seed = async () => {
  await db.delete(tickets);
  await db.insert(tickets).values(seedTickets);
};

logger.info("Starting seed...");
seed()
  .then(() => {
    logger.info("Seed completed");
    process.exit(0);
  })
  .catch((err) => {
    logger.error({ err }, "Seed failed");
    process.exit(1);
  });
