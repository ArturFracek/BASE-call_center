import "dotenv/config";
import { db } from "./index.js";
import { tickets } from "../modules/tickets/dbSchema/dbTicketsSchema.js";
import logger from "../helpers/logger.js";

const seedTickets = [
  {
    customerName: "Jan Kowalski",
    subject: "Problem z logowaniem",
    description: "Nie mogę się zalogować do systemu od wczoraj.",
    priority: "high" as const,
    status: "new" as const,
  },
  {
    customerName: "Anna Nowak",
    subject: "Awaria drukarki",
    description: "Drukarka w biurze nie drukuje od rana.",
    priority: "medium" as const,
    status: "in_progress" as const,
  },
  {
    customerName: "Piotr Wiśniewski",
    subject: "Zapytanie o fakturę",
    description: "Proszę o przesłanie faktury za ostatni miesiąc.",
    priority: "low" as const,
    status: "closed" as const,
  },
  {
    customerName: "Maria Dąbrowska",
    subject: "Zmiana hasła",
    description: "Nie pamiętam hasła do konta, potrzebuję resetu.",
    priority: "high" as const,
    status: "new" as const,
  },
  {
    customerName: "Tomasz Lewandowski",
    subject: "Wolne działanie systemu",
    description: "Aplikacja bardzo się przycina przy otwieraniu raportów.",
    priority: "medium" as const,
    status: "in_progress" as const,
  },
  {
    customerName: "Katarzyna Kamińska",
    subject: "Dostęp do nowego modułu",
    description: "Proszę o nadanie uprawnień do modułu CRM.",
    priority: "low" as const,
    status: "new" as const,
  },
  {
    customerName: "Michał Zieliński",
    subject: "Błąd przy zapisie",
    description: "Po zapisaniu formularza pojawia się komunikat 500.",
    priority: "high" as const,
    status: "in_progress" as const,
  },
  {
    customerName: "Ewa Szymańska",
    subject: "Pytanie o integrację",
    description: "Czy system obsługuje eksport do Excel?",
    priority: "low" as const,
    status: "closed" as const,
  },
  {
    customerName: "Adam Woźniak",
    subject: "Zawieszenie konta",
    description: "Moje konto zostało zablokowane bez podania przyczyny.",
    priority: "high" as const,
    status: "new" as const,
  },
  {
    customerName: "Magdalena Kozłowska",
    subject: "Aktualizacja danych",
    description: "Proszę o aktualizację numeru NIP w systemie.",
    priority: "medium" as const,
    status: "closed" as const,
  },
];

async function seed() {
  await db.insert(tickets).values(seedTickets);
}

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
